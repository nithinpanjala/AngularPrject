import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FoodMenu } from '../Classes/food-menu';
import { RestaurantOperationsService } from '../services/restaurant-operations.service';
import { Restaurant } from '../Classes/restaurant';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-menu-operations',
  templateUrl: './menu-operations.component.html',
  styleUrls: ['./menu-operations.component.css']
})

export class MenuOperationsComponent implements OnInit {
  showResults!: Boolean;
  AddDishItem: FoodMenu = new FoodMenu;
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

    const resId = Number(sessionStorage.getItem('adminrestaurantId'));

    this.restaurantOperationsService.readRestaurant(resId).subscribe((val=>{
      this.AddDishItem.restaurant = val;
      console.log(this.AddDishItem.restaurant,"//////////////////");
    }))
    
    const jwtToken =this.cookies.get('rest_admin_jwt_token')
    if(!jwtToken){
      
      this.router.navigate(['restAdminLogin'])
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
  onItemChange(value: any){
    console.log(" Value is : ", value );
 }
  onAddDishesSubmit(){
    console.log("this.form['formfoodName'].value");
    console.log(this.form['formfoodName'].value);
    this.AddDishItem.foodName = this.form['formfoodName'].value;
    this.AddDishItem.foodPrice = Number(this.form['formfoodPrice'].value);
    this.AddDishItem.foodQuantityAvailable = Number(this.form['formfoodQuantityAvailable'].value);
    this.AddDishItem.isVegeterian = this.form['formisVegeterian'].value;
    //this.AddDishItem.restaurantId = Number(sessionStorage.getItem("adminrestaurantId"));
     this.saveDish();

  }
  saveDish(){
    console.log(this.AddDishItem)
    this.restaurantOperationsService.createDish(this.AddDishItem )
    .subscribe(abc => {
      this.ListAllDishes();
    },
     error => console.log(error));
  
  
  }
  AddDishesForm = this.fb.group({

    formfoodId: ['', [Validators.required]],
    formfoodName: ['', [Validators.required]],
    formfoodPrice: ['',[Validators.required]],
    formfoodQuantityAvailable: ['',[Validators.required]],
    formisVegeterian: ['',[Validators.required]],
});

get form(){
  return this.AddDishesForm.controls
}





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
