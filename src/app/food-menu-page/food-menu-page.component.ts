import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../Classes/cart';
import { FoodMenu } from '../Classes/food-menu';
import { Ordertable } from '../Classes/ordertable';
import { Restaurant } from '../Classes/restaurant';
import { RestaurantOperationsService } from '../services/restaurant-operations.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { CustomerAddress } from '../Classes/customer-address';
import { CartServicesService } from '../services/cart-services.service';

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
  cart: Cart = new Cart;
  foodMenuArray: FoodMenu[] = [];
  ordertableArray: Ordertable[] = [];




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
  }




  addtoCart(id: String, foodId: number) {

    const oneItem = {
      "OrderCustId": Number(sessionStorage.getItem("customerId")),
      "orderRestId": Number(sessionStorage.getItem("restaurantId")),
      "orderFoodId": foodId,
      "quantity": Number(id),
    };
    this.snack.open(oneItem.orderFoodId + "added to cart", "ok", {
      duration: 2000, verticalPosition: 'top',
      horizontalPosition: 'center',
    });

    this.ordertableArray.push(oneItem);
  }


  iterateTable() {

    this.cart.orderTable.forEach(element => {
      console.log("element.OrderCustId" + element.OrderCustId + " **element.orderFoodId*" + element.orderFoodId + " **element.orderRestId**" + element.orderRestId + "*element.quantity** " + element.quantity);
      this.totalPrice += element.quantity * element.orderFoodId
    });

  }


  OpenRestaurant(restroId: number) {
    this.restaurantOperationsService.selectedRestro(restroId)
      .subscribe(abc => {
        console.log(abc);
        this.foodMenuArray = abc;
        this.showResults = true;
      },
        error => console.log(error));
  }
  placeOrder() {
    this.cart.orderTable = JSON.parse(JSON.stringify(this.ordertableArray));
    document.getElementById("FoodMenuContainer")?.classList.add("d-none");
    document.getElementById("ListAddressContainer")?.classList.remove("d-none");
    this.displayAddress();
    //  this.router.navigate(['UserSettings'])
    //  this.iterateTable();


  }

  displayAddress() {
    this.loginService.listAllRestaurants(Number(sessionStorage.getItem("customerId"))).subscribe(abc => {
      this.customerAddressArray = abc;
      this.showResults = true;
    },
      error => console.log(error));
  }

  deliveryAddreessSelected(selectedAddressId: number) {
    this.loginService.getSelectedAdd(selectedAddressId)
      .subscribe(abc => {
        console.log(abc);
        this.cart.deliveryAddress = abc;
      },
        error => console.log(error));
    console.log("**********************");
    console.log(this.cart);
    console.log("**********************");
    this.addDetailsToCart();
    this.router.navigate(['UserSettings'])
  }

  addDetailsToCart() {
    console.log("***********in the box in the box***********");
    console.log(this.cart);
    console.log("********in the box in the box***************");
    this.cartService.createCart(this.cart)
      .subscribe(abc => {
        console.log(abc);
      },
        error => console.log(error));

  }



}
