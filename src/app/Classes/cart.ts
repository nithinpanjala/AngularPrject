import { Customer } from "./customer";
import { CustomerAddress } from "./customer-address";
import { orderItems } from "./orderItems";

export class Cart {
cartNo !:number;
totalPrice!: number;
deliveryAddress!: CustomerAddress;
orderItems!: orderItems[];
 customer !: Customer;
}
