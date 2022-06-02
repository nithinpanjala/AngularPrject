import { RestaurantAddress } from "./restaurant-address";

export class Restaurant {
    restaurantId!: number;
    restaurantName !: String;
    restaurantAddress!: RestaurantAddress;

     getaddress() {
        return this.restaurantAddress.restaurantBuildingNumber +" "+ this.restaurantAddress.restaurantAddressLane1 +" "+ 
        this.restaurantAddress.restaurantAddressLane2 +"  near"+
        this.restaurantAddress.restaurantLandmark +" "+  
        this.restaurantAddress.restaurantDistrict +" "+ 
        this.restaurantAddress.restaurantState +" "+ 
        this.restaurantAddress.restaurantPincode ;
    }

};
