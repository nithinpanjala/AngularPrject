import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../customer';
import { CustomerSignUpServiceService } from '../customer-sign-up-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { CustomerAddress } from '../customer-address';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  customerName !: "String";
  customerPassword !: "String";
  newMobileNumber !: "String";
  newpassword!: "String";
  newEmail !: "String";
  houseNumber!: "String";
  inputAddress1!: "String";
  inputAddress2!: "String";
  Landmark!: "String";
  inputCity!: "String";
  inputState!: "String";
  inputZip!: "String";

  CustAddress: CustomerAddress = new CustomerAddress;

  
  submitted = false;
  constructor(

    private fb: FormBuilder, 
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }

  updateUsermobileForm = this.fb.group({
    customerName: ['', [Validators.required]],
    customerPassword: ['',[Validators.required]],
    newMobileNumber: ['',[Validators.required]],
  });

  get updateUsermobileFormControls(){
    return this.updateUsermobileForm.controls
  }

  UpdatePasswordForm = this.fb.group({
    customerName: ['', [Validators.required]],
    customerPassword: ['',[Validators.required]],
    newpassword: ['',[Validators.required]],
  });

  get UpdatePasswordFormControls(){
    return this.UpdatePasswordForm.controls
  }

  UpdateEmailForm = this.fb.group({
    customerName: ['', [Validators.required]],
    customerPassword: ['',[Validators.required]],
    newEmail: ['',[Validators.required]],
  });
  get UpdateEmailFormControls(){
    return this.UpdateEmailForm.controls
  }

  
  addAddressForm = this.fb.group({
    houseNumber: ['', [Validators.required]],
    inputAddress1: ['',[Validators.required]],
    inputAddress2: ['',[Validators.required]],
    Landmark: ['',[Validators.required]],
    inputCity: ['',[Validators.required]],
    inputState: ['',[Validators.required]],
    inputZip: ['',[Validators.required]],
  });
onAddAddressSubmit(){
  this.CustAddress.custHouseNumber= this.UpdateEmailFormControls['houseNumber'].value;
  this.CustAddress.custAddressLane1= this.UpdateEmailFormControls['inputAddress1'].value;
  this.CustAddress.custAddressLane2 = this.UpdateEmailFormControls['inputAddress2'].value;
  this.CustAddress.custLandmark = this.UpdateEmailFormControls['Landmark'].value;
  this.CustAddress.custDistrict = this.UpdateEmailFormControls['inputCity'].value;
  this.CustAddress.custState = this.UpdateEmailFormControls['inputState'].value;
  this.CustAddress.custPincode = this.UpdateEmailFormControls['inputZip'].value;
  this.addCustomerAddress();
}
addCustomerAddress(){
  this.loginService.addAddress( this.CustAddress)
  .subscribe(abc => {
    console.log(abc);
  },
   error => console.log(error));
}
get addAddressFormControls(){
  return this.addAddressForm.controls
}

  AddAddress(){
    document.getElementById("AddAddressContainer")?.classList.remove("d-none");
    document.getElementById("ListAddressContainer")?.classList.add("d-none");
    document.getElementById("UpdateMobileContainer")?.classList.add("d-none");
    document.getElementById("UpdatePasswordContainer")?.classList.add("d-none");
    document.getElementById("UpdateEmailContainer")?.classList.add("d-none");
  }
  ListMyAddresses(){
    document.getElementById("AddAddressContainer")?.classList.add("d-none");
    document.getElementById("ListAddressContainer")?.classList.remove("d-none");
    document.getElementById("UpdateMobileContainer")?.classList.add("d-none");
    document.getElementById("UpdatePasswordContainer")?.classList.add("d-none");
    document.getElementById("UpdateEmailContainer")?.classList.add("d-none");
  }

  updateUsermobile(){
    document.getElementById("AddAddressContainer")?.classList.add("d-none");
    document.getElementById("ListAddressContainer")?.classList.add("d-none");
    document.getElementById("UpdateMobileContainer")?.classList.remove("d-none");
    document.getElementById("UpdatePasswordContainer")?.classList.add("d-none");
    document.getElementById("UpdateEmailContainer")?.classList.add("d-none");
  }
  updateUserPassword(){
    document.getElementById("AddAddressContainer")?.classList.add("d-none");
    document.getElementById("ListAddressContainer")?.classList.add("d-none");
    document.getElementById("UpdateMobileContainer")?.classList.add("d-none");
    document.getElementById("UpdatePasswordContainer")?.classList.remove("d-none");
    document.getElementById("UpdateEmailContainer")?.classList.add("d-none");
  }
  updateUserEmail(){
    document.getElementById("AddAddressContainer")?.classList.add("d-block");
    document.getElementById("ListAddressContainer")?.classList.add("d-none");
    document.getElementById("UpdateMobileContainer")?.classList.add("d-none");
    document.getElementById("UpdatePasswordContainer")?.classList.add("d-none");
    document.getElementById("UpdateEmailContainer")?.classList.remove("d-none");
  }
  onupdateUsermobileSubmit(){
    this.customerName = this.updateUsermobileFormControls['customerName'].value;
    this.customerPassword = this.updateUsermobileFormControls['customerPassword'].value;
    this.newMobileNumber = this.updateUsermobileFormControls['newMobileNumber'].value;
    this.loginCustomer();
  }
  onupdateUserPasswordSubmit(){
    this.customerName = this.UpdatePasswordFormControls['customerName'].value;
    this.customerPassword = this.UpdatePasswordFormControls['customerPassword'].value;
    this.newpassword = this.UpdatePasswordFormControls['newpassword'].value;
    this.updateUserNewPassword();
  }

  onupdateUserEmailSubmit(){
    this.customerName = this.UpdateEmailFormControls['customerName'].value;
    this.customerPassword = this.UpdateEmailFormControls['customerPassword'].value;
    this.newEmail = this.UpdateEmailFormControls['newEmail'].value;
    this.updateUserNewEmail();
  }

  updateUserNewEmail(){
    this.loginService.updateUserEmail( this.customerName,this.customerPassword , this.newEmail)
    .subscribe(abc => {
      console.log(abc);
    },
     error => console.log(error));
  }

  updateUserNewPassword(){
    this.loginService.updateUserPassword( this.customerName,this.customerPassword , this.newpassword)
    .subscribe(abc => {
      console.log(abc);
    },
     error => console.log(error));
}

  loginCustomer(){
    this.loginService.updateUsermobile( this.customerName,this.customerPassword , this.newMobileNumber)
      .subscribe(abc => {
        console.log(abc);
      },
       error => console.log(error));
  }

 
  get form(){
    return this.updateUsermobileForm.controls
  }
}
