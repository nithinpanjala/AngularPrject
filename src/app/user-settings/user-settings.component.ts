import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../Classes/customer';
import { CustomerSignUpServiceService } from '../services/customer-sign-up-service.service';
import { Router } from '@angular/router';
import { async, Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { CustomerAddress } from '../Classes/customer-address';

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

  customerAddressArray: CustomerAddress[] = [];
  submitted = false;
  showResults = false;
  constructor(

    private fb: FormBuilder, 
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.loginService.getCustomerById(Number(sessionStorage.getItem("customerId"))).subscribe((val=>{
      this.CustAddress.customer = val;
      console.log(this.CustAddress.customer ,"//////////////////");
    }),
    error => console.log(error));
  
  
  }








    // ***************************ADD USER ADDRESS CODE ***********************
  
  addAddressForm = this.fb.group({
    houseNumber: ['', [Validators.required]],
    inputAddress1: ['',[Validators.required]],
    inputAddress2: ['',[Validators.required]],
    Landmark: ['',[Validators.required]],
    inputCity: ['',[Validators.required]],
    inputState: ['',[Validators.required]],
    inputZip: ['',[Validators.required]],
  });
  async onAddAddressSubmit(){
  this.CustAddress.custHouseNumber= this.addAddressFormControls['houseNumber'].value;
  this.CustAddress.custAddressLane1= this.addAddressFormControls['inputAddress1'].value;
  this.CustAddress.custAddressLane2 = this.addAddressFormControls['inputAddress2'].value;
  this.CustAddress.custLandmark = this.addAddressFormControls['Landmark'].value;
  this.CustAddress.custDistrict = this.addAddressFormControls['inputCity'].value;
  this.CustAddress.custState = this.addAddressFormControls['inputState'].value;
  this.CustAddress.custPincode = this.addAddressFormControls['inputZip'].value;
 

  this.loginService.addAddress( this.CustAddress)
  .subscribe(abc => {
    this.ListMyAddresses();
  },
   error => console.log(error));
}

  AddAddress(){
    document.getElementById("AddAddressContainer")?.classList.remove("d-none");
    document.getElementById("ListAddressContainer")?.classList.add("d-none");
    document.getElementById("UpdateMobileContainer")?.classList.add("d-none");
    document.getElementById("UpdatePasswordContainer")?.classList.add("d-none");
    document.getElementById("UpdateEmailContainer")?.classList.add("d-none");
  }
  get addAddressFormControls(){
    return this.addAddressForm.controls
  }



  // *************************** List My Addresses ***********************



  ListMyAddresses(){
    document.getElementById("AddAddressContainer")?.classList.add("d-none");
    document.getElementById("ListAddressContainer")?.classList.remove("d-none");
    document.getElementById("UpdateMobileContainer")?.classList.add("d-none");
    document.getElementById("UpdatePasswordContainer")?.classList.add("d-none");
    document.getElementById("UpdateEmailContainer")?.classList.add("d-none");
    this.showResults = true;
     this.onGetAllAddressesOfCustomer();
  }

  onGetAllAddressesOfCustomer(){
    this.loginService.listAllRestaurants(Number(sessionStorage.getItem("customerId"))).subscribe(abc => {
        this.customerAddressArray = abc;
        this.showResults = true;
      },
       error => console.log(error));
}



  // ***************************Update USER PASSWORD CODE ***********************


  UpdatePasswordForm = this.fb.group({
    customerName: ['', [Validators.required]],
    customerPassword: ['',[Validators.required]],
    newpassword: ['',[Validators.required]],
  });

  get UpdatePasswordFormControls(){
    return this.UpdatePasswordForm.controls
  }
  updateUserPassword(){
    document.getElementById("AddAddressContainer")?.classList.add("d-none");
    document.getElementById("ListAddressContainer")?.classList.add("d-none");
    document.getElementById("UpdateMobileContainer")?.classList.add("d-none");
    document.getElementById("UpdatePasswordContainer")?.classList.remove("d-none");
    document.getElementById("UpdateEmailContainer")?.classList.add("d-none");
  }
  onupdateUserPasswordSubmit(){
    this.customerName = this.UpdatePasswordFormControls['customerName'].value;
    this.customerPassword = this.UpdatePasswordFormControls['customerPassword'].value;
    this.newpassword = this.UpdatePasswordFormControls['newpassword'].value;
    this.updateUserNewPassword();
  }

  updateUserNewPassword(){
    this.loginService.updateUserPassword( this.customerName,this.customerPassword , this.newpassword)
    .subscribe(abc => {
      console.log(abc);
    },
     error => console.log(error));
}



  // ***************************Update USER EMAIL CODE ***********************




  UpdateEmailForm = this.fb.group({
    customerName: ['', [Validators.required]],
    customerPassword: ['',[Validators.required]],
    newEmail: ['',[Validators.required]],
  });
  get UpdateEmailFormControls(){
    return this.UpdateEmailForm.controls
  }

  updateUserEmail(){
    document.getElementById("AddAddressContainer")?.classList.add("d-block");
    document.getElementById("ListAddressContainer")?.classList.add("d-none");
    document.getElementById("UpdateMobileContainer")?.classList.add("d-none");
    document.getElementById("UpdatePasswordContainer")?.classList.add("d-none");
    document.getElementById("UpdateEmailContainer")?.classList.remove("d-none");
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


  // ***************************Update USER MOBILE CODE ***********************


  updateUsermobileForm = this.fb.group({
    customerName: ['', [Validators.required]],
    customerPassword: ['',[Validators.required]],
    newMobileNumber: ['',[Validators.required]],
  });

  
  get updateUsermobileFormControls(){
    return this.updateUsermobileForm.controls
  }


  
  updateUsermobile(){
    document.getElementById("AddAddressContainer")?.classList.add("d-none");
    document.getElementById("ListAddressContainer")?.classList.add("d-none");
    document.getElementById("UpdateMobileContainer")?.classList.remove("d-none");
    document.getElementById("UpdatePasswordContainer")?.classList.add("d-none");
    document.getElementById("UpdateEmailContainer")?.classList.add("d-none");
  }

  onupdateUsermobileSubmit(){
    this.customerName = this.updateUsermobileFormControls['customerName'].value;
    this.customerPassword = this.updateUsermobileFormControls['customerPassword'].value;
    this.newMobileNumber = this.updateUsermobileFormControls['newMobileNumber'].value;
    this.updateUsermobileaaa();
  }

updateUsermobileaaa(){
    this.loginService.updateUsermobile( this.customerName,this.customerPassword , this.newMobileNumber)
      .subscribe(abc => {
        console.log(abc);
      },
       error => console.log(error));
  }





 

}
