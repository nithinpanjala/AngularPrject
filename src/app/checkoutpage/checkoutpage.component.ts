import { Component, OnInit } from '@angular/core';
import { Cart } from '../Classes/cart';
import { Checkout } from '../Classes/checkout';
import { Customer } from '../Classes/customer';
import { CustomerAddress } from '../Classes/customer-address';
import { FoodMenu } from '../Classes/food-menu';
import { orderItems } from '../Classes/orderItems';
import { CartServicesService } from '../services/cart-services.service';
import { LoginService } from '../services/login.service';
import { RestaurantOperationsService } from '../services/restaurant-operations.service';

@Component({
  selector: 'app-checkoutpage',
  templateUrl: './checkoutpage.component.html',
  styleUrls: ['./checkoutpage.component.css']
})
export class CheckoutpageComponent implements OnInit {
cart !: Cart
cartNo !: Number;
customer !: Customer;
myDate = new Date();
name !: String;
address!: String;
mobile !: number;
finalPrice!: number;
email !: String;
totalPrice :any ;
tax :any;
customerAddress !: CustomerAddress;
orderItemsArray: orderItems[] = [];
checkoutList: Checkout[] = []
checkoutItem !: Checkout;
  display: boolean = false;
  constructor(
    private restaurantServices : RestaurantOperationsService,
    private loginServices :LoginService,
    private cartService : CartServicesService,
  ) { }

  ngOnInit(): void {
     this.cartService.readCart(Number(sessionStorage.getItem("cartNo"))).subscribe(abc => {
      this.cart = abc;
      this.address = this.cart.deliveryAddress.custHouseNumber + " " +  this.cart.deliveryAddress.custAddressLane1
      + " " +  this.cart.deliveryAddress.custAddressLane2
      + "near " +  this.cart.deliveryAddress.custLandmark
      + " " +  this.cart.deliveryAddress.custDistrict
      + " " +  this.cart.deliveryAddress.custState
      + " " +  this.cart.deliveryAddress.custPincode;
      ;
      this.name = String(sessionStorage.getItem("customerName"));
      this.cartNo = Number(sessionStorage.getItem("cartNo"));
      this.orderItemsArray = JSON.parse(JSON.stringify(this.cart.orderItems));
      this.totalPrice = this.cart.totalPrice;
      console.log(this.address);
      this.getcustomer();
    },
      error => console.log(error));
  }
  getcustomer(){
    this.loginServices.getCustomerById(Number(sessionStorage.getItem("customerId"))).subscribe(abc => {
      this.customer = abc;
      this.mobile = Number(this.customer.customerMobile);
      this.email = String(this.customer.customerEmail);
      this.getCartOrderItemDetails()
    },
      error => console.log(error));

  }
  getCartOrderItemDetails(){

    this.orderItemsArray.forEach(element => {
      var checkoutItem = new Checkout();
      console.log(element);
     checkoutItem.requiredQuantity = element.quantity;
      this.restaurantServices.selectedDish(element.orderFoodId).subscribe(abc => {

        checkoutItem.foodName = abc.foodName;
        checkoutItem.foodPrice =   abc.foodPrice;
        var a =( (checkoutItem.requiredQuantity) * (checkoutItem.foodPrice));
        checkoutItem.totalFoodCost =a;
        this.updateDishQuantityAsPerOrder((abc.foodQuantityAvailable - checkoutItem.requiredQuantity ), element.orderFoodId);

      },
        error => console.log(error));

    this.checkoutList.push(checkoutItem); 
    this.diiiii();
    });

  }
  diiiii(){
    this.tax = Number(this.totalPrice * (0.05));
    this.finalPrice=this.totalPrice+this.tax
    this.display = true;
    
  }

  functionPrint(){
   
      window.print();
    
  }
  updateDishQuantityAsPerOrder(quant : number , id : number){
this.restaurantServices.updateDish(quant , id).subscribe(abc => {
  console.log(abc);
},
  error => console.log(error));
  }


}
