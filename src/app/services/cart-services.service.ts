import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../Classes/cart';
import { orderItems } from '../Classes/orderItems';

@Injectable({
  providedIn: 'root'
})
export class CartServicesService {

  constructor(
    private httpClient: HttpClient,

  ) { }
  private baseURL = "http://localhost:7070/cartOperations/";
  private OrdersbaseURL = "http://localhost:7070/OrderItemsOperations/";

  createCart(cart : Cart): Observable<Cart>{
    return this.httpClient.post<Cart>(`${this.baseURL}CreateCart`, cart);

  }



  readCart(cartNo : number): Observable<Cart>{
    return this.httpClient.get<Cart>(`${this.baseURL}`+'readCart/'+`${cartNo}/`);
  
  }

  
  updateCart(cart : Cart): Observable<Cart>{
  
    return this.httpClient.put<Cart>(`${this.baseURL}`+'UpdateCart/',cart);
  }

  deleteDish(cartNo : number):Observable<String>{
    return this.httpClient.delete<String>(`${this.baseURL}deleteDish/`+cartNo);
  
  
  }






  CreateOrderItems(ordertable : orderItems): Observable<orderItems>{
    
    return this.httpClient.post<orderItems>(`${this.OrdersbaseURL}CreateOrderItems`, ordertable);

  }



  readOrderItems(cartNo : number): Observable<Cart>{
    return this.httpClient.get<Cart>(`${this.baseURL}`+'readCart/'+`${cartNo}/`);
  
  }

  
  updateOrderItems(ordertable : orderItems): Observable<Cart>{
  
    return this.httpClient.put<Cart>(`${this.baseURL}`+'UpdateCart/',ordertable);
  }

  deleteOrderItems(cartNo : number):Observable<String>{
    return this.httpClient.delete<String>(`${this.baseURL}deleteDish/`+cartNo);
  
  
  }


}
