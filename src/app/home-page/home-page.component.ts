
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantOperationsService } from '../services/restaurant-operations.service';
import { LoginPageComponent } from '../login-page/login-page.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  constructor(
    private router: Router,
    private loginPageComponent: LoginPageComponent,
    private restaurantOperationsService: RestaurantOperationsService,
    private cookies:CookieService,
  ) { }

  ngOnInit(): void {

    const jwtToken =this.cookies.get('jwt_token')
    
    if(!jwtToken){
      
      this.router.navigate(['login'])
    }
    else{
      console.log(jwtToken)

    }

  }



}
