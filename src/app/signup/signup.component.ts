import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../Classes/customer';
import { CustomerSignUpServiceService } from '../services/customer-sign-up-service.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 
  customer: Customer = new Customer();
  submitted = false;
 

  

  constructor(
    private router : Router,
    private fb: FormBuilder, 
    private customerSignUpServiceService: CustomerSignUpServiceService
   

  ) { }

  customerForm = this.fb.group({
    customerName: ['', [Validators.required], Validators.minLength(8)],
    customerPassword: ['',[Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    customerFirstName: ['',[Validators.required]],
    customerLastName: ['',[Validators.required]],
    customerMobile: ['',[Validators.required , Validators.minLength(10) , Validators.maxLength(10)]],
    customerEmail: ['',[Validators.required , Validators.email]]
  });


  ngOnInit(): void {
  }


  onSubmit(){
    this.customer = new Customer();
    this.customer.customerName = this.form['customerName'].value;
    this.customer.customerPassword = this.form['customerPassword'].value;
    this.customer.customerFirstName = this.form['customerFirstName'].value;
    this.customer.customerLastName = this.form['customerLastName'].value;
    this.customer.customerEmail = this.form['customerEmail'].value;
    this.customer.customerMobile = this.form['customerMobile'].value;
    this.submitted = true;
    this.saveCustomer();
  }


  saveCustomer(){
    this.customerSignUpServiceService.addCustomer(this.customer)
      .subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('login');
      },
       error => console.log(error));
    // this.book = new Book();
  }

  get form(){
    return this.customerForm.controls
  }

  get customerPassword(){
    return this.customerForm.get('customerPassword')
  }
  


}
