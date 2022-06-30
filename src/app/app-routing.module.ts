import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodMenuPageComponent } from './food-menu-page/food-menu-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { MenuOperationsComponent } from './menu-operations/menu-operations.component';
import { RestAdminsignUpComponent } from './rest-adminsign-up/rest-adminsign-up.component';
import { RestOperationsComponent } from './rest-operations/rest-operations.component';
import { Restaurant } from './Classes/restaurant';
import { RestaurantAdminPageComponent } from './restaurant-admin-page/restaurant-admin-page.component';
import { RestaurantHomeComponent } from './restaurant-home/restaurant-home.component';
import { RestaurantOperationsService } from './services/restaurant-operations.service';
import { RestaurantsPageComponent } from './restaurants-page/restaurants-page.component';
import { SignupComponent } from './signup/signup.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { CheckoutpageComponent } from './checkoutpage/checkoutpage.component';

const routes: Routes = [
  {path : "", component: MainHomeComponent},
  {path : "home", component: HomePageComponent},
  {path : "login", component: LoginPageComponent},
  {path : 'signup', component: SignupComponent},
  {path : 'UserSettings', component: UserSettingsComponent},
  {path : 'restAdminLogin', component: RestaurantAdminPageComponent},
  {path : 'restHome', component: RestaurantHomeComponent},
  {path : 'restsignUp', component: RestAdminsignUpComponent},
  {path : 'restaurantslist', component: RestaurantsPageComponent},
  {path : 'restOperations', component: RestOperationsComponent},
  {path : 'menuOperations', component: MenuOperationsComponent},
  {path : 'MainHome', component: MainHomeComponent},
  {path : 'checkout',component: CheckoutpageComponent},
  {path : 'FoodMenuPage/:restaurantId',component: FoodMenuPageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
