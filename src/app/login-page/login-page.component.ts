import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { Customer } from '../customer';
import { CustomerSignUpServiceService } from '../customer-sign-up-service.service';
import { LoginService } from '../login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  customerName !: "String";
  customerPassword !: "String";
  submitted = false;

  array1: Customer[] = [];
  searchResultsEl = document.getElementById("exploreMenuSection");
  showResults = false;



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customerSignUpServiceService: CustomerSignUpServiceService,
    private loginService: LoginService,
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


  //    displayResults(customers:Customer[]) {

  //     for (let customer of customers) {
  //         this.createAndAppendSearchResult(customer);
  //     }
  // }

  // createAndAppendSearchResult(result: Customer) {

  //   let resultItemEl = document.createElement("div");
  //   resultItemEl.classList.add("shadow menu-item-card p-3 mb-3");

  //   let titleEl = document.createElement("h1");
  //   titleEl.textContent =`${result.customerName}`;
  //   titleEl.classList.add("menu-card-title");
  //   resultItemEl.appendChild(titleEl);

  //   let titleBreakEl = document.createElement("br");
  //   resultItemEl.appendChild(titleBreakEl);

  //   let descriptionEl = document.createElement("p");
  //   descriptionEl.classList.add("menu-item-link");
  //   descriptionEl.textContent = `${result.customerFirstName}`;
  //   resultItemEl.appendChild(descriptionEl);

  //   let descriptionE2 = document.createElement("p");
  //   descriptionE2.classList.add("menu-item-link");
  //   descriptionE2.textContent = `${result.customerFirstName}`;
  //   resultItemEl.appendChild(descriptionE2);

  //   let descriptionE3 = document.createElement("p");
  //   descriptionE3.classList.add("menu-item-link");
  //   descriptionE3.textContent = `${result.customerLastName}`;
  //   resultItemEl.appendChild(descriptionE3);

  // }



}
