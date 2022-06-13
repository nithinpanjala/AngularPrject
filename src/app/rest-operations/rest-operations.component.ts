import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Restaurant } from '../Classes/restaurant';
import { RestaurantOperationsService } from '../services/restaurant-operations.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rest-operations',
  templateUrl: './rest-operations.component.html',
  styleUrls: ['./rest-operations.component.css']
})
export class RestOperationsComponent implements OnInit {

  restaurant : Restaurant = new Restaurant;
  constructor(
    private fb: FormBuilder, 
    public cookies : CookieService,
    private router: Router,
    private restaurantOperationsService : RestaurantOperationsService,
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

  // ***************************Delete Restaurant CODE ***********************

  deleteRestForm = this.fb.group({

    restaurantName: ['', [Validators.required]],
    restaurantBuildingNumber: ['', [Validators.required]],
    restaurantAddressLane1: ['',[Validators.required]],
    restaurantAddressLane2: ['',[Validators.required]],
    restaurantLandmark: ['',[Validators.required]],
    restaurantDistrict: ['',[Validators.required]],
    restaurantState: ['',[Validators.required]],
    restaurantPincode: ['',[Validators.required]],
});


  deleteRest(){
    document.getElementById("createRestContainer")?.classList.add("d-none");
    document.getElementById("deleteRestContainer")?.classList.remove("d-none");
    document.getElementById("UpdateRestContainer")?.classList.add("d-none");
    document.getElementById("UpdateRestAddressContainer")?.classList.add("d-none");
    document.getElementById("UpdateLandMarkContainer")?.classList.add("d-none");
    document.getElementById("UpdateHouseNoAndStreetContainer")?.classList.add("d-none");


  }
  ondeleteRestSubmit(){

  }

  get deleteRestFormControls(){
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
  this.restaurantOperationsService.createRestro( this.restaurant)
  .subscribe(abc => {
    console.log(abc);
  },
   error => console.log(error));
}


get UpdateRestFormControls(){
  return this.createRestForm.controls
}
  // ***************************update Restaurant Address CODE ***********************


UpdateRestAddress(){
  document.getElementById("createRestContainer")?.classList.add("d-none");
  document.getElementById("deleteRestContainer")?.classList.add("d-none");
  document.getElementById("UpdateRestContainer")?.classList.add("d-none");
  document.getElementById("UpdateRestAddressContainer")?.classList.remove("d-none");
  document.getElementById("UpdateLandMarkContainer")?.classList.add("d-none");
  document.getElementById("UpdateHouseNoAndStreetContainer")?.classList.add("d-none");


}

onUpdateRestAddress(){

}
onUpdateRestAddressSubmit(){

}
UpdateRestAddressForm = this.fb.group({

  restaurantName: ['', [Validators.required]],
  restaurantBuildingNumber: ['', [Validators.required]],
  restaurantAddressLane1: ['',[Validators.required]],
  restaurantAddressLane2: ['',[Validators.required]],
  restaurantLandmark: ['',[Validators.required]],
  restaurantDistrict: ['',[Validators.required]],
  restaurantState: ['',[Validators.required]],
  restaurantPincode: ['',[Validators.required]],
});


  // ***************************Update Restaurant LandMark Restaurant CODE ***********************


UpdateRestLandMark(){

  document.getElementById("createRestContainer")?.classList.add("d-none");
  document.getElementById("deleteRestContainer")?.classList.add("d-none");
  document.getElementById("UpdateRestContainer")?.classList.add("d-none");
  document.getElementById("UpdateRestAddressContainer")?.classList.add("d-none");
  document.getElementById("UpdateLandMarkContainer")?.classList.remove("d-none");
  document.getElementById("UpdateHouseNoAndStreetContainer")?.classList.add("d-none");

}
onUpdateLandMark(){

}
onUpdateLandMarkSubmit(){

}
UpdateLandMarkForm = this.fb.group({

  restaurantName: ['', [Validators.required]],
  restaurantBuildingNumber: ['', [Validators.required]],
  restaurantAddressLane1: ['',[Validators.required]],
  restaurantAddressLane2: ['',[Validators.required]],
  restaurantLandmark: ['',[Validators.required]],
  restaurantDistrict: ['',[Validators.required]],
  restaurantState: ['',[Validators.required]],
  restaurantPincode: ['',[Validators.required]],
});


  // ***************************Update Restaurant HouseNo And Street CODE ***********************



UpdateHouseNoAndStreetContainer(){
  document.getElementById("createRestContainer")?.classList.add("d-none");
  document.getElementById("deleteRestContainer")?.classList.add("d-none");
  document.getElementById("UpdateRestContainer")?.classList.add("d-none");
  document.getElementById("UpdateRestAddressContainer")?.classList.add("d-none");
  document.getElementById("UpdateLandMarkContainer")?.classList.add("d-none");
  document.getElementById("UpdateHouseNoAndStreetContainer")?.classList.remove("d-none");

}
onUpdateHouseNoAndStreet(){

}
onUpdateHouseNoAndStreetSubmit(){

}
UpdateHouseNoAndStreetForm = this.fb.group({

  restaurantName: ['', [Validators.required]],
  restaurantBuildingNumber: ['', [Validators.required]],
  restaurantAddressLane1: ['',[Validators.required]],
  restaurantAddressLane2: ['',[Validators.required]],
  restaurantLandmark: ['',[Validators.required]],
  restaurantDistrict: ['',[Validators.required]],
  restaurantState: ['',[Validators.required]],
  restaurantPincode: ['',[Validators.required]],
});



}
