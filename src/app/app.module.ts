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


@NgModule({
  declarations: [
    AppComponent,
    PipesComponent,
    TemplateDrivenComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupComponent,
    RestaurantsPageComponent,

   
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