import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../Classes/cart';
import { FoodMenu } from '../Classes/food-menu';
import { Ordertable } from '../Classes/ordertable';
import { Restaurant } from '../Classes/restaurant';
import { RestaurantOperationsService } from '../services/restaurant-operations.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-food-menu-page',
  templateUrl: './food-menu-page.component.html',
  styleUrls: ['./food-menu-page.component.css'],

})
export class FoodMenuPageComponent implements OnInit {
  quantity: number = 0;
  totalPrice: number = 0;
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
    
    private restaurantOperationsService: RestaurantOperationsService,
    private snack : MatSnackBar,
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
    this.snack.open(oneItem.orderFoodId +"added to cart", "ok", { duration: 2000,verticalPosition: 'top',
    horizontalPosition: 'center',});

    this.ordertableArray.push(oneItem);
  }


  iterateTable(){
    
    this.cart.orderTable.forEach(element => {
  console.log("element.OrderCustId"+element.OrderCustId + " **element.orderFoodId*"+ element.orderFoodId+" **element.orderRestId**"+element.orderRestId+"*element.quantity** "+element.quantity);
      this.totalPrice += element.quantity * element.orderFoodId
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
    this.cart.orderTable = JSON.parse(JSON.stringify(this.ordertableArray));
    this.router.navigate(['UserSettings'])
    this.iterateTable();


  }

}
