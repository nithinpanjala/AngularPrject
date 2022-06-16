import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Customer } from '../Classes/customer';
import { CustomerSignUpServiceService } from '../services/customer-sign-up-service.service';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from '../Classes/cart';
import { CartServicesService } from '../services/cart-services.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  customerName !: "String";
  customerPassword !: "String";
  submitted = false;
  cart : Cart = new Cart;

  array1: Customer[] = [];
  searchResultsEl = document.getElementById("exploreMenuSection");
  showResults = false;



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customerSignUpServiceService: CustomerSignUpServiceService,
    private loginService: LoginService,
    private cartService : CartServicesService,
    private authService: AuthenticationService,
    private cookies: CookieService

  ) { }
  onSubmit() {

    this.customerName = this.form["customerName"].value;
    this.customerPassword = this.form['customerPassword'].value;
    this.submitted = true;
    this.onLogin();

  }
  loginForm = this.fb.group({
    customerName: ['', [Validators.required]],
    customerPassword: ['', [Validators.required]],
  });


  ngOnInit(): void {
    
  }

  onSignUp() {
    this.router.navigateByUrl('signup');
  }

  onLogin() {
    this.customerName = this.form['customerName'].value;
    this.customerPassword = this.form['customerPassword'].value;
    this.loginCustomer();


  }
  onGetAll() {
    this.getAllCustomers();
  }

  loginCustomer() {
    this.loginService.getCustomer(this.customerName, this.customerPassword)
      .subscribe(abc => {
        console.log(abc);
        this.cart.customer = abc;
        if (abc == null) {

          //this.snack.open("Bad credentials", "ok", { duration: 2000 })
          console.log('bad credentials')
        }
        else {

          const requestBody = { customerName: this.customerName, customerPassword: this.customerPassword }
          this.authService.generateToken(requestBody).subscribe((data) => {
            const parsedData = JSON.parse(data);
            this.cookies.set('jwt_token', parsedData.JWT, { expires: 30 });
             
            console.log(parsedData);
            
          })

          console.log('success')

          //this.snack.open("Success", "ok", { duration: 1000 })
          const a = abc.customerName.toString();
          const b = abc.customerId.toString();
          sessionStorage.setItem('customerName', a);
          sessionStorage.setItem('customerId', b);
          sessionStorage.setItem('cart', JSON.stringify(this.cart));
          this.router.navigateByUrl('home');

        }



      },
        error => console.log(error));
  }
 
  getAllCustomers() {
    this.loginService.getAllCustomer()
      .subscribe(abc => {

        this.array1 = abc;
        console.log(this.array1);
        this.showResults = true;
      },
        error => console.log(error));

  }

  get form() {
    return this.loginForm.controls
  }


}
