import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FoodMenu } from '../food-menu';
import { RestaurantOperationsService } from '../restaurant-operations.service';

@Component({
  selector: 'app-menu-operations',
  templateUrl: './menu-operations.component.html',
  styleUrls: ['./menu-operations.component.css']
})
export class MenuOperationsComponent implements OnInit {
  showResults!: Boolean;
  restId: number = 0;
  ListAllDishesArray: FoodMenu[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private restaurantOperationsService : RestaurantOperationsService,
    private cookies:CookieService
  ) { }




  ngOnInit(): void {
    
    const jwtToken =this.cookies.get('jwt_token')
    
    if(!jwtToken){
      
      this.router.navigate(['login'])
    }
    else{
      
      console.log(jwtToken)
     
    }
  }


  AddDishes(){
    document.getElementById("AddDishesContainer")?.classList.remove("d-none");
    document.getElementById("ListAllDishesContainer")?.classList.add("d-none");
    document.getElementById("UpdateDishContainer")?.classList.add("d-none");
    document.getElementById("deleteDishContainer")?.classList.add("d-none");

  }
  onAddDishesSubmit(){

  }
  AddDishesForm = this.fb.group({

    restaurantName: ['', [Validators.required]],
    restaurantBuildingNumber: ['', [Validators.required]],
    restaurantAddressLane1: ['',[Validators.required]],
    restaurantAddressLane2: ['',[Validators.required]],
    restaurantLandmark: ['',[Validators.required]],
    restaurantDistrict: ['',[Validators.required]],
    restaurantState: ['',[Validators.required]],
    restaurantPincode: ['',[Validators.required]],
});

  UpdateDish(){
    document.getElementById("AddDishesContainer")?.classList.add("d-none");
    document.getElementById("ListAllDishesContainer")?.classList.add("d-none");
    document.getElementById("UpdateDishContainer")?.classList.remove("d-none");
    document.getElementById("deleteDishContainer")?.classList.add("d-none");
  }
  onUpdateDishSubmit(){

  }

  UpdateDishForm = this.fb.group({

    restaurantName: ['', [Validators.required]],
    restaurantBuildingNumber: ['', [Validators.required]],
    restaurantAddressLane1: ['',[Validators.required]],
    restaurantAddressLane2: ['',[Validators.required]],
    restaurantLandmark: ['',[Validators.required]],
    restaurantDistrict: ['',[Validators.required]],
    restaurantState: ['',[Validators.required]],
    restaurantPincode: ['',[Validators.required]],
});




  ListAllDishes(){
    document.getElementById("AddDishesContainer")?.classList.add("d-none");
    document.getElementById("ListAllDishesContainer")?.classList.remove("d-none");
    document.getElementById("UpdateDishContainer")?.classList.add("d-none");
    document.getElementById("deleteDishContainer")?.classList.add("d-none");
  }


  onListAllDishesSubmit(restidfromHtml: String){
    this.showResults = true;
    this.restId= Number(restidfromHtml);
    document.getElementById("iterator")?.classList.remove("d-none");
    this.restaurantOperationsService.selectedRestro(this.restId)
    .subscribe(abc => {

      console.log(abc);
      this.ListAllDishesArray = abc;
      console.log(this.ListAllDishesArray);
      this.showResults = true;
    },
     error => console.log(error));
  }





  deleteDish(){

    document.getElementById("AddDishesContainer")?.classList.add("d-none");
    document.getElementById("ListAllDishesContainer")?.classList.add("d-none");
    document.getElementById("UpdateDishContainer")?.classList.add("d-none");
    document.getElementById("deleteDishContainer")?.classList.remove("d-none");
  }
  ondeleteDishSubmit(){

  }
  deleteDishForm = this.fb.group({

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
