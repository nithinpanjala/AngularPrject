import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodMenuPageComponent } from './food-menu-page/food-menu-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { Restaurant } from './restaurant';
import { RestaurantOperationsService } from './restaurant-operations.service';
import { RestaurantsPageComponent } from './restaurants-page/restaurants-page.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path : "", component: HomePageComponent},
  {path : "home", component: HomePageComponent},
  {path : "login", component: LoginPageComponent},
  {path : 'signup', component: SignupComponent},
  {path : 'restaurantslist', component: RestaurantsPageComponent},
  {path : 'FoodMenuPage',component: FoodMenuPageComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
