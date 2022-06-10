import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  private foodListURl = "http://localhost:7070/FoodMenuOperations/";


  listAllRestaurants(): Observable<Restaurant[]>{
    return this.httpClient.get<Restaurant[]>(`${this.baseURL}`+'getAllRestaurant/');
  }



  selectedRestro(restaurantId : number): Observable<FoodMenu[]>{

    const params = new HttpParams().set('restaurantId',restaurantId);
    return this.httpClient.get<FoodMenu[]>(`${this.foodListURl}getAllDishes`,{params});


  }
  selectedDish(dishId : number): Observable<FoodMenu>{

    const params = new HttpParams().set('Dishid',dishId);
    return this.httpClient.get<FoodMenu>(`${this.foodListURl}readDish`,{params});


  }


  updateDish(quantity: number , dishId:number): Observable<FoodMenu>{
    const params = new HttpParams().set('quantity',quantity).set('DishId',dishId);
    return this.httpClient.put<FoodMenu>(`${this.foodListURl}`+'updateDishQuantity/'+quantity+'/'+dishId , FoodMenu);
  }


  deleteDish(disId : number):Observable<String>{
    return this.httpClient.delete<String>(`${this.foodListURl}deleteDish/`+disId);


  }
  createRestro(restaurant : Restaurant): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}createRestaurant`, restaurant);

  }
  updateRestaurant(restaurant : Restaurant): Observable<Object>{
  
    return this.httpClient.put<Restaurant>(`${this.baseURL}`+'updateRestaurant/',restaurant);
  }


}

