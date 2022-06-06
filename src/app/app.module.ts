import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipesComponent } from './component/pipes/pipes.component';
import { TemplateDrivenComponent } from './component/template-driven/template-driven.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule} from '@angular/common/http';
import { RestaurantsPageComponent } from './restaurants-page/restaurants-page.component';
import { FoodMenuPageComponent } from './food-menu-page/food-menu-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { RestaurantAdminPageComponent } from './restaurant-admin-page/restaurant-admin-page.component';


@NgModule({
  declarations: [
    AppComponent,
    PipesComponent,
    TemplateDrivenComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupComponent,
    RestaurantsPageComponent,
    FoodMenuPageComponent,
    HeaderComponent,
    FooterComponent,
    UserSettingsComponent,
    RestaurantAdminPageComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
