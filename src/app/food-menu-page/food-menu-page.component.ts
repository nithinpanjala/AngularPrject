import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FoodMenu } from '../food-menu';
import { RestaurantOperationsService } from '../restaurant-operations.service';
import { Restaurant  } from '../restaurant';
@Component({
  selector: 'app-food-menu-page',
  templateUrl: './food-menu-page.component.html',
  styleUrls: ['./food-menu-page.component.css']
})
export class FoodMenuPageComponent implements OnInit {
  showResults = false;
  restaurant1: Restaurant | undefined;
  @Input() restaurant!: Restaurant;

  foodMenuArray: FoodMenu[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    
    private restaurantOperationsService: RestaurantOperationsService
  ) { }

  ngOnInit(): void {

      // First get the product id from the current route.
      const routeParams = this.route.snapshot.paramMap;
      const restaurantIdFromRoute = Number(routeParams.get('restaurantId'));
    this.OpenRestro(restaurantIdFromRoute);
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
