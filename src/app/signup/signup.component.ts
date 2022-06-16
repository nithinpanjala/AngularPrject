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
    private fb: FormBuilder, 
    private customerSignUpServiceService: CustomerSignUpServiceService
   

  ) { }

  customerForm = this.fb.group({
    customerName: ['', [Validators.required]],
    customerPassword: ['',[Validators.required]],
    customerFirstName: ['',[Validators.required]],
    customerLastName: ['',[Validators.required]],
    customerMobile: ['',[Validators.required]],
    customerEmail: ['',[Validators.required]]
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

      },
       error => console.log(error));
    // this.book = new Book();
  }

  get form(){
    return this.customerForm.controls
  }

  


}
