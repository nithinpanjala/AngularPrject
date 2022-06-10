import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantAdmin } from '../restaurant-admin';
import { Restaurant } from '../restaurant';
import { RestaurantAdminService } from '../restaurant-admin.service';

@Component({
  selector: 'app-rest-adminsign-up',
  templateUrl: './rest-adminsign-up.component.html',
  styleUrls: ['./rest-adminsign-up.component.css']
})
export class RestAdminsignUpComponent implements OnInit {

  ngOnInit(): void {
    
  }
 
 
  restaurantAdmin: RestaurantAdmin = new RestaurantAdmin();
  submitted = false;
 

  

  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private restAdminServices : RestaurantAdminService
   

  ) { }

  RestAdminSignUpForm = this.fb.group({
    adminName: ['', [Validators.required]],
    adminPassword: ['',[Validators.required]],
    adminFirstName: ['',[Validators.required]],
    adminLastName: ['',[Validators.required]],
    adminMobile: ['',[Validators.required]],
    adminEmail: ['',[Validators.required]],
    restaurantName: ['',[Validators.required]]
  });

  onSubmit(){
    this.restaurantAdmin = new RestaurantAdmin();

    this.restaurantAdmin.adminName = this.form['adminName'].value;
    this.restaurantAdmin.adminPassword = this.form['adminPassword'].value;
    this.restaurantAdmin.adminFirstName = this.form['adminFirstName'].value;
    this.restaurantAdmin.adminLastName = this.form['adminLastName'].value;
    this.restaurantAdmin.adminEmail = this.form['adminEmail'].value;
    this.restaurantAdmin.adminMobile = this.form['adminMobile'].value;
    this.submitted = true;
    this.saveAdmin();
  }
  saveAdmin(){
    this.restAdminServices.restAdminSignUpfunction(this.restaurantAdmin)
      .subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('restAdminLogin');
      },
       error => console.log(error));
       this.router.navigateByUrl('restsignUp');

  }
  get form(){
    return this.RestAdminSignUpForm.controls
  }

  

}
