import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantOperationsService } from '../restaurant-operations.service';
import { LoginPageComponent } from '../login-page/login-page.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private router: Router,
    private loginPageComponent: LoginPageComponent,
    private restaurantOperationsService: RestaurantOperationsService
  ) { }

  ngOnInit(): void {
  }
  
}
