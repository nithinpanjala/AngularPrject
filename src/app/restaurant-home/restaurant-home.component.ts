import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css']
})
export class RestaurantHomeComponent implements OnInit {
  showResults!: true;
  customerAddressArray!: [];
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
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
