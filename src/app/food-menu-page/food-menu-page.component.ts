<<<<<<< HEAD
import { Component, OnInit, Input } from '@angular/core';
=======
import { Component, OnInit ,Input} from '@angular/core';
>>>>>>> f5a7a0680a1871a86e0731dad8953e461b3fda2e
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FoodMenu } from '../food-menu';
import { Restaurant } from '../restaurant';
import { RestaurantOperationsService } from '../restaurant-operations.service';
import { Restaurant  } from '../restaurant';
@Component({
  selector: 'app-food-menu-page',
  templateUrl: './food-menu-page.component.html',
  styleUrls: ['./food-menu-page.component.css']
})
export class FoodMenuPageComponent implements OnInit {
  showResults = false;
<<<<<<< HEAD
  restaurant1: Restaurant | undefined;
  @Input() restaurant!: Restaurant;
=======
   @Input() restaurant!: Restaurant;
  foodMenuArray: FoodMenu[] = [];
  constructor(
>>>>>>> f5a7a0680a1871a86e0731dad8953e461b3fda2e

  foodMenuArray: FoodMenu[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    
    private restaurantOperationsService: RestaurantOperationsService
  ) { }

  ngOnInit(): void {
<<<<<<< HEAD

      // First get the product id from the current route.
      const routeParams = this.route.snapshot.paramMap;
      const restaurantIdFromRoute = Number(routeParams.get('restaurantId'));
    this.OpenRestro(restaurantIdFromRoute);
=======
    this.OpenRestro(restaurant.restaurantId);
>>>>>>> f5a7a0680a1871a86e0731dad8953e461b3fda2e
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
