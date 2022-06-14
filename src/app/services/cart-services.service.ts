import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../Classes/cart';

@Injectable({
  providedIn: 'root'
})
export class CartServicesService {

  constructor(
    private httpClient: HttpClient,

  ) { }
  private baseURL = "http://localhost:7070/cartOperations/";


  createCart(cart : Cart): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}CreateCart`, cart);

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


}
