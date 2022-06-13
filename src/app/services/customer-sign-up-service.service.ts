
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Classes/customer';

@Injectable(
  {
    providedIn:'root'
  }
)

export class CustomerSignUpServiceService {
  private baseURL = "http://localhost:7070/customers/";

  constructor(private httpClient: HttpClient) { }

  addCustomer(customer: Customer): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}createUser`, customer);
  }






  

}
