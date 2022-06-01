import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodMenu } from '../food-menu';
import { Restaurant } from '../restaurant';
import { RestaurantOperationsService } from '../restaurant-operations.service';

@Component({
  selector: 'app-restaurants-page',
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css']
})
export class RestaurantsPageComponent implements OnInit {

  showResults = false;
  array2: Restaurant[] = [];
  foodMenuArray: FoodMenu[] = [];
  constructor(

    private router: Router,
    
    private restaurantOperationsService: RestaurantOperationsService
  ) { }

  ngOnInit(): void {
    this.onGetAllRestaurants();
    
  }
  onGetAllRestaurants(){
    this.listRestaurants();
  }

  OpenRestro(){
    this.getFoodList(document.getElementById("restaurantIdHeader")?.textContent as unknown as number);
  }

  getFoodList(id : number){
    this.restaurantOperationsService.selectedRestro(id)
      .subscribe(abc => {
        console.log(abc);
      },
       error => console.log(error));
    // this.book = new Book();
  }

  listRestaurants(){
    this.restaurantOperationsService.listAllRestaurants()
      .subscribe(abc => {

    this.array2 = abc;
        console.log(abc);
        this.showResults = true;
      },
       error => console.log(error));
    // this.book = new Book();
  }
}
