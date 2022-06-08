import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
import { FoodMenu } from '../food-menu';
import { Restaurant } from '../restaurant';
import { RestaurantOperationsService } from '../restaurant-operations.service';

@Component({
  selector: 'app-restaurants-page',
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css']
})
export class RestaurantsPageComponent implements OnInit {

  showResults = false;
  array2: Restaurant[] = [];
  foodMenuArray: FoodMenu[] = [];
  constructor(

    private router: Router,
    
    private restaurantOperationsService: RestaurantOperationsService,
    private cookies:CookieService
  ) { }

  ngOnInit(): void {
   

    const jwtToken =this.cookies.get('jwt_token')
    
    if(!jwtToken){
      
      this.router.navigate(['login'])
    }
    else{
      
      console.log(jwtToken)
      this.onGetAllRestaurants();
     
    }
   

    
  }
  onGetAllRestaurants(){
      this.restaurantOperationsService.listAllRestaurants().subscribe(abc => {
          this.array2 = abc;
          console.log(this.array2);
          this.showResults = true;
        },
         error => console.log(error));
  }

getFoodMenu(id: number){
  sessionStorage.setItem('restaurantId', id.toString());
  this.router.navigateByUrl('FoodMenuPage');
}
}
