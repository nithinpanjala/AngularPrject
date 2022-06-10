import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css']
})
export class RestaurantHomeComponent implements OnInit {
  showResults!: true;
  customerAddressArray!: [];
  constructor(
    public cookies : CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    const jwtToken =this.cookies.get('rest_admin_jwt_token')
    
    if(!jwtToken){
      
      this.router.navigate(['login'])
    }
    else{
      console.log(jwtToken)

    }

  }

  FoodMenuOperations(){
    
    this.router.navigateByUrl('menuOperations');
    document.getElementById("wcuSection")?.classList.add("d-none");
    document.getElementById("FoodMenuContainer")?.classList.remove("d-none");
    document.getElementById("RestOperationsContainer")?.classList.add("d-none");
    this.showResults = true;
  }
  RestOperations(){
    this.router.navigateByUrl('restOperations');
    document.getElementById("wcuSection")?.classList.add("d-none");
    document.getElementById("FoodMenuContainer")?.classList.add("d-none");
    document.getElementById("RestOperationsContainer")?.classList.remove("d-none");
    this.showResults = true;
  }

}
