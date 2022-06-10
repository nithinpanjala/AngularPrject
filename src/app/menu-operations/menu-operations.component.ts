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
  ListAllDishesArray: FoodMenu[] = [];
  updateSelectedDishID!: number;
  updateItem !: FoodMenu;
  foodId!: number;
  foodName!: String;
  foodPrice!: number;
  foodQuantityAvailable!: number;
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

  
  
  deleteSelectedDish(itemId: number){
    this.restaurantOperationsService.deleteDish(itemId)
    .subscribe(abc => {

      console.log(abc);
      this.onListAllDishesSubmit();
    },
     error => console.log(error));
}


  AddDishes(){
    document.getElementById("AddDishesContainer")?.classList.remove("d-none");
    document.getElementById("ListAllDishesContainer")?.classList.add("d-none");
    document.getElementById("UpdateDishContainer")?.classList.add("d-none");
    document.getElementById("OpeningTiles")?.classList.add("d-none");
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





updateSelectedDish(itemId: number){
  this.updateSelectedDishID = itemId;
 
  this.restaurantOperationsService.selectedDish(itemId )
  .subscribe(abc => {
    console.log(abc.foodName+ "   "+abc.foodPrice);
    this.foodId= abc.foodId;
    this.foodName= abc.foodName;
    this.foodPrice= abc.foodPrice;
    this.foodQuantityAvailable= abc.foodQuantityAvailable;
  this.UpdateDish();
  },
   error => console.log(error));


}


  UpdateDish(){
    document.getElementById("AddDishesContainer")?.classList.add("d-none");
    document.getElementById("ListAllDishesContainer")?.classList.add("d-none");
    document.getElementById("UpdateDishContainer")?.classList.remove("d-none");
    document.getElementById("OpeningTiles")?.classList.add("d-none");
    
  }
  onUpdateDishSubmit(quantity: any){
    this.restaurantOperationsService.updateDish(Number(quantity) , this.foodId)
    .subscribe(abc => {
      this.ListAllDishes();
    },
     error => console.log(error));
  }


  ListAllDishes(){
    document.getElementById("AddDishesContainer")?.classList.add("d-none");
    document.getElementById("UpdateDishContainer")?.classList.add("d-none");
    document.getElementById("ListAllDishesContainer")?.classList.remove("d-none");
    document.getElementById("OpeningTiles")?.classList.add("d-none");
    this.onListAllDishesSubmit();
  }


  onListAllDishesSubmit(){
    this.showResults = true;

    document.getElementById("iterator")?.classList.remove("d-none");
    this.restaurantOperationsService.selectedRestro(Number(sessionStorage.getItem("adminrestaurantId")))
    .subscribe(abc => {

      console.log(abc);
      this.ListAllDishesArray = abc;
      console.log(this.ListAllDishesArray);
      this.showResults = true;
    },
     error => console.log(error));
  }


}
