import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Restaurant } from '../Classes/restaurant';
import { RestaurantOperationsService } from '../services/restaurant-operations.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RestaurantAddress } from '../Classes/restaurant-address';
import { RestaurantAdminService } from '../services/restaurant-admin.service';
@Component({
  selector: 'app-rest-operations',
  templateUrl: './rest-operations.component.html',
  styleUrls: ['./rest-operations.component.css']
})
export class RestOperationsComponent implements OnInit {
  UpdatedRestAddress :RestaurantAddress = new RestaurantAddress;
  restaurant : Restaurant = new Restaurant;

  adminPassword!: string;
  adminName!: string;
  submitted: boolean = false;



  constructor(
    private fb: FormBuilder, 
    public cookies : CookieService,
    private router: Router,
    private restaurantOperationsService : RestaurantOperationsService,
    private restaurantAdminService: RestaurantAdminService,
  ) { }

  ngOnInit(): void {

    const jwtToken =this.cookies.get('rest_admin_jwt_token')
    if(!jwtToken){
      
      this.router.navigate(['login'])
    }
    else{
      console.log(jwtToken)

    }

  }



    // ***************************ADD Restaurant CODE ***********************
    createRestForm = this.fb.group({

      restaurantName: ['', [Validators.required]],
      restaurantBuildingNumber: ['', [Validators.required]],
      restaurantAddressLane1: ['',[Validators.required]],
      restaurantAddressLane2: ['',[Validators.required]],
      restaurantLandmark: ['',[Validators.required]],
      restaurantDistrict: ['',[Validators.required]],
      restaurantState: ['',[Validators.required]],
      restaurantPincode: ['',[Validators.required]],
  });
  onCreateRestSubmit(){
    this.restaurant.restaurantName= this.createRestFormControls['restaurantName'].value;
  this.restaurant.restaurantAddress.restaurantBuildingNumber= this.createRestFormControls['restaurantBuildingNumber'].value;
  this.restaurant.restaurantAddress.restaurantAddressLane1= this.createRestFormControls['restaurantAddressLane1'].value;
  this.restaurant.restaurantAddress.restaurantAddressLane2 = this.createRestFormControls['restaurantAddressLane2'].value;
  this.restaurant.restaurantAddress.restaurantLandmark = this.createRestFormControls['restaurantLandmark'].value;
  this.restaurant.restaurantAddress.restaurantDistrict = this.createRestFormControls['restaurantDistrict'].value;
  this.restaurant.restaurantAddress.restaurantState = this.createRestFormControls['restaurantState'].value;
  this.restaurant.restaurantAddress.restaurantPincode = this.createRestFormControls['restaurantPincode'].value;
  this.createrREstaurant();
}

createrREstaurant(){
  this.restaurantOperationsService.createRestro( this.restaurant)
  .subscribe(abc => {
    console.log(abc);
  },
   error => console.log(error));
}
createRest(){
    document.getElementById("createRestContainer")?.classList.remove("d-none");
    document.getElementById("deleteRestContainer")?.classList.add("d-none");
    document.getElementById("UpdateRestContainer")?.classList.add("d-none");
    document.getElementById("AddRestAddressContainer")?.classList.add("d-none");
    document.getElementById("UpdateRestAddressContainer")?.classList.add("d-none");
    document.getElementById("deleteRestAddressContainer")?.classList.add("d-none");
    document.getElementById("UpdateLandMarkContainer")?.classList.add("d-none");
    document.getElementById("UpdateHouseNoAndStreetContainer")?.classList.add("d-none");

  }
  get createRestFormControls(){
    return this.createRestForm.controls
  }


  // ***************************Update Restaurant CODE ***********************

  
UpdateRest(){
  document.getElementById("createRestContainer")?.classList.add("d-none");
  document.getElementById("deleteRestContainer")?.classList.add("d-none");
  document.getElementById("UpdateRestContainer")?.classList.remove("d-none");
  document.getElementById("UpdateRestAddressContainer")?.classList.add("d-none");
  document.getElementById("UpdateLandMarkContainer")?.classList.add("d-none");
  document.getElementById("UpdateHouseNoAndStreetContainer")?.classList.add("d-none");


}
UpdateRestForm = this.fb.group({

  restaurantName: ['', [Validators.required]],
  restaurantBuildingNumber: ['', [Validators.required]],
  restaurantAddressLane1: ['',[Validators.required]],
  restaurantAddressLane2: ['',[Validators.required]],
  restaurantLandmark: ['',[Validators.required]],
  restaurantDistrict: ['',[Validators.required]],
  restaurantState: ['',[Validators.required]],
  restaurantPincode: ['',[Validators.required]],
});

UpdateRestSubmit(){
  this.restaurant.restaurantName= this.UpdateRestFormControls['restaurantName'].value;
  this.restaurant.restaurantAddress.restaurantBuildingNumber= this.UpdateRestFormControls['restaurantBuildingNumber'].value;
  this.restaurant.restaurantAddress.restaurantAddressLane1= this.UpdateRestFormControls['restaurantAddressLane1'].value;
  this.restaurant.restaurantAddress.restaurantAddressLane2 = this.UpdateRestFormControls['restaurantAddressLane2'].value;
  this.restaurant.restaurantAddress.restaurantLandmark = this.UpdateRestFormControls['restaurantLandmark'].value;
  this.restaurant.restaurantAddress.restaurantDistrict = this.UpdateRestFormControls['restaurantDistrict'].value;
  this.restaurant.restaurantAddress.restaurantState = this.UpdateRestFormControls['restaurantState'].value;
  this.restaurant.restaurantAddress.restaurantPincode = this.UpdateRestFormControls['restaurantPincode'].value;
  this.updateRestaurant();
}
updateRestaurant(){
  this.restaurantOperationsService.updateRestaurant( this.restaurant)
  .subscribe(abc => {
    console.log(abc);
  },
   error => console.log(error));
}


get UpdateRestFormControls(){
  return this.createRestForm.controls
}

  // ***************************Delete Restaurant CODE ***********************


  deleteRest(){
    document.getElementById("createRestContainer")?.classList.add("d-none");
    document.getElementById("deleteRestContainer")?.classList.remove("d-none");
    document.getElementById("UpdateRestContainer")?.classList.add("d-none");
  }
  
  ondeleteRestSubmit(){

    this.restaurantOperationsService.deleteRest( Number(sessionStorage.getItem("adminrestaurantId")))
    .subscribe(abc => {
      console.log(abc);
    },
     error => console.log(error));
  }

  restaurantDeleteForm = this.fb.group({
    adminName: ['', [Validators.required]],
    adminPassword: ['',[Validators.required]],
  });
 

  get restaurantDeleteFormControls(){
    return this.restaurantDeleteForm.controls
  }
  confirmDelete(){

    this.adminName = this.restaurantDeleteFormControls['adminName'].value;
    this.adminPassword = this.restaurantDeleteFormControls['adminPassword'].value;
    this.submitted = true;
    this.verifyAdmin();
  }
  verifyAdmin(){

    this.restaurantAdminService.getAdmin( this.adminName,this.adminPassword)
    .subscribe(abc => {
      console.log(abc);
      if (abc == null) {
        console.log('bad credentials')
      }
      else {
        this.ondeleteRestSubmit();
        }


    },
     error => console.log(error));
}



}
