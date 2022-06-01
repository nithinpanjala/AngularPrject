import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private httpClient: HttpClient) { } 
  private baseURL = "http://localhost:7070/customers/";

  getCustomer(customerName: String, customerPassword : String): Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseURL}`+'readUserByUserNameAndPassword/'+`${customerName}/`+`${customerPassword}`);
  }
  
  getAllCustomer(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseURL}`+'getAllCustomers/');
  }
  

}
