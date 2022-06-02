import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { FoodMenu } from '../food-menu';
import { Restaurant } from '../restaurant';
import { RestaurantOperationsService } from '../restaurant-operations.service';

@Component({
  selector: 'app-food-menu-page',
  templateUrl: './food-menu-page.component.html',
  styleUrls: ['./food-menu-page.component.css']
})
export class FoodMenuPageComponent implements OnInit {
  showResults = false;
   @Input() restaurant!: Restaurant;
  foodMenuArray: FoodMenu[] = [];
  constructor(

    private router: Router,
    
    private restaurantOperationsService: RestaurantOperationsService
  ) { }

  ngOnInit(): void {
    this.OpenRestro(restaurant.restaurantId);
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
