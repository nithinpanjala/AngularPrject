import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantAdmin } from '../Classes/restaurant-admin';

@Injectable({
  providedIn: 'root'
})
export class RestaurantAdminService {
  constructor(private httpClient: HttpClient) { } 
  private baseURL = "http://localhost:7070/restaurantAdmin/";
  private baseCustAddURL = "http://localhost:7070/addresses/";



  getAdmin(adminName: String, adminPassword : String): Observable<RestaurantAdmin>{
    return this.httpClient.get<RestaurantAdmin>(`${this.baseURL}`+'readUserByUserNameAndPassword/'+`${adminName}/`+`${adminPassword}`);
  }

  restAdminSignUpfunction(restAdmin : RestaurantAdmin): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}createUser`, restAdmin);
  }

  updateUsermobile(adminName: String, adminPassword : String,newMobileNumber : String): Observable<RestaurantAdmin>{
  
    return this.httpClient.put<RestaurantAdmin>(`${this.baseURL}`+'updateUsermobile/'+`${adminName}/`+`${adminPassword}/`+`${newMobileNumber}`,RestaurantAdmin);
  }


  updateUser(admin: RestaurantAdmin): Observable<RestaurantAdmin>{
  
    return this.httpClient.put<RestaurantAdmin>(`${this.baseURL}`+'updateUser/'+`${admin}`,RestaurantAdmin);
  }


  updateUserPassword(adminName: String, adminPassword : String,newUserPassword : String): Observable<RestaurantAdmin>{
  
    return this.httpClient.put<RestaurantAdmin>(`${this.baseURL}`+'updateUserPassword/'+`${adminName}/`+`${adminPassword}/`+`${newUserPassword}`,RestaurantAdmin);
  }


  updateUserEmail(adminName: String, adminPassword : String,newUserEmail : String): Observable<RestaurantAdmin>{
  
    return this.httpClient.put<RestaurantAdmin>(`${this.baseURL}`+'updateUserEmail/'+`${adminName}/`+`${adminPassword}/`+`${newUserEmail}`,RestaurantAdmin);
  }


}
