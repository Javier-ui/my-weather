import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { MyWeatherComponent } from './modules/my-weather/my-weather.component';
import { MyWeatherService } from './modules/my-weather/_services/my-weather.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { LoginService } from './modules/login/_services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    MyWeatherComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    GoogleMapsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [MyWeatherService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
