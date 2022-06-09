import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantAdmin } from '../restaurant-admin';
import { RestaurantAdminService } from '../restaurant-admin.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-restaurant-admin-page',
  templateUrl: './restaurant-admin-page.component.html',
  styleUrls: ['./restaurant-admin-page.component.css']
})
export class RestaurantAdminPageComponent implements OnInit {
  adminPassword!: string;
  adminName!: string;
  submitted = false;
  
  array1: RestaurantAdmin[] = [];
  constructor(
private cookies : CookieService,
    private router: Router,
    private fb: FormBuilder, 
    private restaurantAdminService: RestaurantAdminService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
 
    

  }

  restaurantAdminloginForm = this.fb.group({
    adminName: ['', [Validators.required]],
    adminPassword: ['',[Validators.required]],
  });

  onSignUp(){
    this.router.navigateByUrl('restsignUp');
  }

  onLogin(){
    this.adminName = this.form['adminName'].value;
    this.adminPassword = this.form['adminPassword'].value;
    this.submitted = true;
    this.adminLogin();
  }

  onSubmit(){
    this.adminName = this.form["adminName"].value;
        this.adminPassword = this.form['adminPassword'].value;
    this.submitted = true;
    this.adminLogin();
      
    }

  adminLogin(){
    this.restaurantAdminService.getAdmin( this.adminName,this.adminPassword)
      .subscribe(abc => {
        console.log(abc);
        
        if (abc == null) {

          //this.snack.open("Bad credentials", "ok", { duration: 2000 })
          console.log('bad credentials')
        }
        else {

          const requestBody = { customerName: this.adminName, customerPassword: this.adminPassword }
          this.authService.generateToken(requestBody).subscribe((data) => {
            const parsedData = JSON.parse(data);
            this.cookies.set('rest_admin_jwt_token', parsedData.JWT, { expires: 30 });
             
            console.log(parsedData);
            
          })

          console.log('success')
          
          //this.snack.open("Success", "ok", { duration: 1000 })
          const a = abc.adminId.toString();
          const b = abc.adminName.toString();
          sessionStorage.setItem('adminId', a);
          sessionStorage.setItem('adminName', b);
          const c = abc.restaurant.restaurantId.toString();
          sessionStorage.setItem('adminId', a);
          sessionStorage.setItem('adminName', b);
          sessionStorage.setItem('adminrestaurantId', c);
          this.router.navigateByUrl('restHome');

        }


       

      },
       error => console.log(error));
  }
  get form(){
    return this.restaurantAdminloginForm.controls
  }


}
