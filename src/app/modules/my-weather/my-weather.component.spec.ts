import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialExampleModule } from 'src/material.module';
import { LoginService } from '../login/_services/login.service';

import { MyWeatherComponent } from './my-weather.component';
import { MyWeatherServiceMock } from './_mocks/my-weather.service-mock';
import { CityWeatherModel } from './_moodels/city-weather.model';
import { CityModel } from './_moodels/city.model';
import { CordModel } from './_moodels/cord.model';
import { InfoModel } from './_moodels/info.model';
import { MyWeatherService } from './_services/my-weather.service';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('MyWeatherComponent', () => {
  let component: MyWeatherComponent;
  let fixture: ComponentFixture<MyWeatherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
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
      declarations: [MyWeatherComponent],
      providers: [
        { provide: MyWeatherService, useClass: MyWeatherServiceMock },
        LoginService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let city1 = new CityModel()
    let city2 = new CityModel()
    city1.id = 1;
    city1.name = 'city1';
    city2.id = 2;
    city2.name = 'city2';
    component.cities = [
      city1,
      city2
    ]
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addCity should call getUserCities()', () => {
    const spy = spyOn<any>(component, 'getUserCities');
    component.addCity('city1')
    expect(spy).toHaveBeenCalled();
  });

  it('removeCity should call getUserCities()', () => {
    const spy = spyOn<any>(component, 'getUserCities');
    component.removeCity()
    expect(spy).toHaveBeenCalled();
  });

  it('selectCity create', () => {
    const citySelected = new CityModel();
    const cityWeather = new CityWeatherModel();
    const weather = new InfoModel();

    component.temp = 199

    citySelected.id = 1;
    cityWeather.coord = new CordModel();
    cityWeather.coord.lat = 1;
    cityWeather.coord.lon = 2;
    cityWeather.main = { temp: 300 };
    weather.description = 'cloud';
    weather.id = 1
    weather.icon = 'test';
    cityWeather.weather = [weather];
    spyOn<any>(component['service'], 'getCityWeather').and.returnValue(of(cityWeather));
    component.selectCity(citySelected);
    expect(component.imgUrl).toEqual(component.imgBaseUrl.replace('{ICON_STRING}', cityWeather.weather[0].icon));
  });

  it('checkCity add new city to remove', () => {
    component.citiesToRemove = [];
    component.checkCity(1);
    expect(component.citiesToRemove).toEqual([1]);
  });

  it('checkCity remove city to remove list', () => {
    component.citiesToRemove = [1];
    component.checkCity(1);
    expect(component.citiesToRemove).toEqual([]);
  });

});
