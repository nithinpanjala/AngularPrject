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
  oneItem: orderItems = new orderItems;
  cart !: Cart;
  cusId!: number;
  exx!: number;
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
    this.cusId = Number(routeParams.get('customerId'));
    this.OpenRestaurant(restaurantIdFromRoute);




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

    this.oneItem.OrderCustId = this.cusId;
    this.oneItem.orderRestId = Number(sessionStorage.getItem("restaurantId")),
      this.oneItem.orderFoodId = foodId,
      this.oneItem.quantity = Number(id),
      this.stupidfunction();

  }
  async  stupidfunction(){
    this.cartService.readCart(Number(sessionStorage.getItem("cartNo")))
        .subscribe(async abc => {
          this.cart =await  JSON.parse(JSON.stringify(abc));
          this.oneItem.cart =await  JSON.parse(JSON.stringify(abc));
        },
          error => console.log(error));
      this.addOrdersToOrderTable();
  }
  async  addOrdersToOrderTable() {
    this.cartService.CreateOrderItems(this.oneItem)
      .subscribe(async abc => {
        await console.log(abc);
      },
        error => console.log(error));
  }


  placeOrder() {
    this.loginService.getCustomerById(Number(sessionStorage.getItem("customerId"))).subscribe((val => {
      this.cart.customer = JSON.parse(JSON.stringify(val));
    }),
      error => console.log(error));

    //  this.cart.orderItems = JSON.parse(JSON.stringify(this.ordertableArray));
    document.getElementById("FoodMenuContainer")?.classList.add("d-none");
    document.getElementById("ListAddressContainer")?.classList.remove("d-none");
    this.displayAddress();
    //  this.router.navigate(['UserSettings'])
    //  this.iterateTable();


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
    this.addDetailsToCart();

  }

  addDetailsToCart() {

    console.log("********front ENDDDDDDDD***************");
    console.log(this.cart);
    console.log("********front ENDDDDDDDD***************");
    this.cartService.updateCart(this.cart)
      .subscribe(abc => {
        console.log("********Output Output Output Output***************");
        console.log(abc);
        console.log("********Output Output Output Output***************");
      },
        error => console.log(error));

  }
}
