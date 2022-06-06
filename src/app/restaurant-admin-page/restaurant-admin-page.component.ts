import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantAdmin } from '../restaurant-admin';
import { RestaurantAdminService } from '../restaurant-admin.service';

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

    private router: Router,
    private fb: FormBuilder, 
    private restaurantAdminService: RestaurantAdminService,
  ) { }

  ngOnInit(): void {
  }

  restaurantAdminloginForm = this.fb.group({
    adminName: ['', [Validators.required]],
    adminPassword: ['',[Validators.required]],
  });

  onSignUp(){
    this.router.navigateByUrl('signup');
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

        this.router.navigateByUrl('home');

      },
       error => console.log(error));
  }
  get form(){
    return this.restaurantAdminloginForm.controls
  }


}
