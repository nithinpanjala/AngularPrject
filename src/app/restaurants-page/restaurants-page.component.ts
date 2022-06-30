import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
import { FoodMenu } from '../Classes/food-menu';
import { Restaurant } from '../Classes/restaurant';
import { RestaurantOperationsService } from '../services/restaurant-operations.service';

@Component({
  selector: 'app-restaurants-page',
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css']
})
export class RestaurantsPageComponent implements OnInit {

  showResults = false;
  array2: Restaurant[] = [];
  OpenRestro = "open restro";
  pavanif = true;
  constructor(
    private router: Router,
    private restaurantOperationsService: RestaurantOperationsService,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {



    this.onGetAllRestaurants();

  }
  onGetAllRestaurants() {
    this.restaurantOperationsService.listAllRestaurants().subscribe(abc => {
      this.array2 = abc;
      console.log(this.array2);
      this.showResults = true;
    },
    error => console.log(error));
  }


}
