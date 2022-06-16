import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../Classes/cart';
import { FoodMenu } from '../Classes/food-menu';
import { orderItems } from '../Classes/orderItems';
import { Restaurant } from '../Classes/restaurant';
import { RestaurantOperationsService } from '../services/restaurant-operations.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { CustomerAddress } from '../Classes/customer-address';
import { CartServicesService } from '../services/cart-services.service';
import { async } from 'rxjs/internal/scheduler/async';

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
  customerAddressArray: CustomerAddress[] = [];
  foodMenuArray: FoodMenu[] = [];
  selectedAddress !: CustomerAddress;
  orderItemsArray: orderItems[] = [];
cart: Cart = new Cart;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private cartService: CartServicesService,
    private restaurantOperationsService: RestaurantOperationsService,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {

    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const restaurantIdFromRoute = Number(routeParams.get('restaurantId'));
    sessionStorage.setItem('restaurantId', restaurantIdFromRoute.toString());
    this.OpenRestaurant(restaurantIdFromRoute);

    this.cart = JSON.parse(sessionStorage.getItem('cart') || '{}');



  }

  OpenRestaurant(restroId: number) {
    this.restaurantOperationsService.selectedRestro(restroId)
      .subscribe(abc => {

        this.foodMenuArray = abc;
        this.showResults = true;
      },
        error => console.log(error));
  }



  addtoCart(id: String, foodId: number) {
    var oneItem = new orderItems();
 oneItem.orderCustId = Number(sessionStorage.getItem("customerId")),
   oneItem.orderRestId = Number(sessionStorage.getItem("restaurantId")),
   oneItem.orderFoodId = foodId,
     oneItem.quantity = Number(id),
     this.orderItemsArray.push(oneItem);

  }


  placeOrder() {
  
      this.cart.orderItems = JSON.parse(JSON.stringify(this.orderItemsArray));
    document.getElementById("FoodMenuContainer")?.classList.add("d-none");
    document.getElementById("ListAddressContainer")?.classList.remove("d-none");
    this.displayAddress();

  }

  displayAddress() {
    this.loginService.listAllRestaurants(Number(sessionStorage.getItem("customerId"))).subscribe(abc => {
      this.customerAddressArray = JSON.parse(JSON.stringify(abc));
    },
      error => console.log(error));
  }


  deliveryAddreessSelected(selectedAddressId: number) {

    this.customerAddressArray.forEach(element => {
      if (element.custAddressId == selectedAddressId) {
        this.cart.deliveryAddress = JSON.parse(JSON.stringify(element));
      }
    });
    this.creatingCart();


  }


  // addDetailsToCart() {
  //   this.orderItemsArray.forEach(element => {
  //     element.cart = this.cart;
  //     this.cartService.CreateOrderItems(element).subscribe( abc =>{
  //       console.log(abc);
  //     },   error => console.log(error));
  // })
  // console.log("********Output Output Output Output***************");

  // console.log(this.cart);
  // console.log("********Output Output Output Output***************");



  // }
  creatingCart(){
    console.log("///////////front end //////////////");
    console.log(this.cart);

    this.cartService.createCart(this.cart)
    .subscribe(abc => {
      this.cart = abc;
      console.log("********final output***************");

      console.log(this.cart);

    },
      error => console.log(error));

     // this.reduceOrderFromInventory();
     // this.addDetailsToCart();
  }

//   reduceOrderFromInventory(){
//     var quantity =0;
//     var itemId =0;
//  this.orderItemsArray.forEach(element => {
//   quantity = element.quantity;
//   itemId = this.foodMenuArray.find({ quantitya= }) => name === 'cherries' );
//    element.orderFoodId;
//   this.restaurantOperationsService.updateDish(quantity,itemId)
//   .subscribe(abc => {
//     console.log(abc);
//  console.log("updated food item in inventory " )
//   },
//    error => console.log(error));
//  });

//   }
}
