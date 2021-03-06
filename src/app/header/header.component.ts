import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
  }
  logout(){
    sessionStorage.clear();
    this.cookies.deleteAll;
    this.router.navigateByUrl('');
    
  }

  RestOperations(){
    this.router.navigateByUrl('restOperations');
    
  }
  FoodMenuOperations(){
    
    this.router.navigateByUrl('menuOperations');

  }
}
