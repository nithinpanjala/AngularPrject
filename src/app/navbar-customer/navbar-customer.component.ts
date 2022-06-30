import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar-customer',
  templateUrl: './navbar-customer.component.html',
  styleUrls: ['./navbar-customer.component.css']
})
export class NavbarCustomerComponent implements OnInit {

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
}
