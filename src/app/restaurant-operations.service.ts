import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodMenu } from './food-menu';
import { Restaurant } from './restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantOperationsService {

  
  constructor(private httpClient: HttpClient) { } 
  private baseURL = "http://localhost:7070/RestaurantOperations/";


  listAllRestaurants(): Observable<Restaurant[]>{
    return this.httpClient.get<Restaurant[]>(`${this.baseURL}`+'getAllRestaurant/');
  }

  selectedRestro(restaurantId : number){
    return this.httpClient.get<FoodMenu>(`${this.baseURL}`+'getAllDishes/'+`${restaurantId}`);

  }
}

