import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../cart';
import { FoodMenu } from '../food-menu';
import { Ordertable } from '../ordertable';
import { Restaurant } from '../restaurant';
import { RestaurantOperationsService } from '../restaurant-operations.service';

@Component({
  selector: 'app-food-menu-page',
  templateUrl: './food-menu-page.component.html',
  styleUrls: ['./food-menu-page.component.css']
})
export class FoodMenuPageComponent implements OnInit {
  quantity: number = 0;
  showResults = false;
  restaurant1: Restaurant | undefined;
  @Input() restaurant!: Restaurant;
  restaurant2: Restaurant | undefined;

  cart: Cart = new Cart;
  foodMenuArray: FoodMenu[] = [];
  ordertableArray: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    
    private restaurantOperationsService: RestaurantOperationsService
  ) { }

  ngOnInit(): void {

      // First get the product id from the current route.
      const routeParams = this.route.snapshot.paramMap;
      const restaurantIdFromRoute = Number(routeParams.get('restaurantId'));
      sessionStorage.setItem('restaurantId', restaurantIdFromRoute.toString());

    this.OpenRestaurant(restaurantIdFromRoute);
  }




  addtoCart(id : String, foodId: number){
 
    const oneItem = {
      "OrderCustId" : Number(sessionStorage.getItem("customerId")),
      "orderRestId":Number(sessionStorage.getItem("restaurantId")), 
      "orderFoodId" : foodId,
      "quantity" :Number(id),
    };

    this.ordertableArray.push(oneItem);
  }


  iterateTable(){
    this.ordertableArray.forEach(element => {
  console.log(element.OrderCustId + " ***"+ element.orderFoodId+" ****"+element.orderRestId+"*** "+element.quantity);
});
  }


  OpenRestaurant(restroId : number){
  this.restaurantOperationsService.selectedRestro(restroId)
      .subscribe(abc => {
        console.log(abc);
        this.foodMenuArray = abc;
        this.showResults = true;
      },
       error => console.log(error));
  }
  placeOrder(){
    this.iterateTable();
    this.cart.orderTable = this.ordertableArray;
  }

}
