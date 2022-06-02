import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodMenu } from '../food-menu';
import { RestaurantOperationsService } from '../restaurant-operations.service';

@Component({
  selector: 'app-food-menu-page',
  templateUrl: './food-menu-page.component.html',
  styleUrls: ['./food-menu-page.component.css']
})
export class FoodMenuPageComponent implements OnInit {
  showResults = false;
  foodMenuArray: FoodMenu[] = [];
  constructor(

    private router: Router,
    
    private restaurantOperationsService: RestaurantOperationsService
  ) { }

  ngOnInit(id : number): void {
    this.OpenRestro(id);
  }
  addtoCart(id : number){

  }
  OpenRestro(id : number){
  this.restaurantOperationsService.selectedRestro(id)
      .subscribe(abc => {
        console.log(abc);
        this.foodMenuArray = abc;
        console.log(this.foodMenuArray);
        this.showResults = true;
      },
       error => console.log(error));
  }
}
