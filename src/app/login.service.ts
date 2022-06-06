import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { CustomerAddress } from './customer-address';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private httpClient: HttpClient) { } 
  private baseURL = "http://localhost:7070/customers/";
  private baseCustAddURL = "http://localhost:7070/addresses/";



  getCustomer(customerName: String, customerPassword : String): Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseURL}`+'readUserByUserNameAndPassword/'+`${customerName}/`+`${customerPassword}`);
  }
  getAllCustomer(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseURL}`+'getAllCustomers/');
  }






  updateUsermobile(customerName: String, customerPassword : String,newMobileNumber : String): Observable<Customer>{
  
    return this.httpClient.put<Customer>(`${this.baseURL}`+'updateUsermobile/'+`${customerName}/`+`${customerPassword}/`+`${newMobileNumber}`,Customer);
  }


  updateUser(customer: Customer): Observable<Customer>{
  
    return this.httpClient.put<Customer>(`${this.baseURL}`+'updateUser/'+`${Customer}`,Customer);
  }


  updateUserPassword(customerName: String, customerPassword : String,newUserPassword : String): Observable<Customer>{
  
    return this.httpClient.put<Customer>(`${this.baseURL}`+'updateUserPassword/'+`${customerName}/`+`${customerPassword}/`+`${newUserPassword}`,Customer);
  }


  updateUserEmail(customerName: String, customerPassword : String,newUserEmail : String): Observable<Customer>{
  
    return this.httpClient.put<Customer>(`${this.baseURL}`+'updateUserEmail/'+`${customerName}/`+`${customerPassword}/`+`${newUserEmail}`,Customer);
  }

addAddress(CustomerAddress : CustomerAddress){
  return this.httpClient.post<Customer>(`${this.baseCustAddURL}`+'updateUserEmail/'+`${CustomerAddress}/`,Customer);
  }

getAllAddresses(customerName: String, customerPassword : String){
  return this.httpClient.get<Customer>(`${this.baseURL}`+'readUserByUserNameAndPassword/'+`${customerName}/`+`${customerPassword}`);
}

}
