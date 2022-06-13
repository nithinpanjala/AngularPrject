import { CustomerAddress } from "./customer-address";
import { Ordertable } from "./ordertable";

export class Cart {
cartNo !:number;
totalPrice!: number;
deliveryAddress!: CustomerAddress;
 orderTable!: Ordertable[];
}
