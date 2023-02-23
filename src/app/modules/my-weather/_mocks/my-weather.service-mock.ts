import { Injectable } from '@angular/core';

import { cities } from './cities';
import { CityModel } from '../_moodels/city.model';
import { CityWeatherModel } from '../_moodels/city-weather.model';
import { Observable, of } from 'rxjs';


@Injectable()
export class MyWeatherServiceMock {

  getCityWeather(idCity: number): Observable<CityWeatherModel> {

    return of(new CityWeatherModel());
  }

  getCitiesList(): Observable<CityModel[]> {

    return of(cities);
  }

  addUserCity(city: CityModel): Observable<boolean> {

    return of(true);
  }

  removeUserCity(cities: number[]): Observable<boolean> {

    return of(true);
  }

  getUserCities(): Observable<CityModel[]> {

    return of([] as CityModel[]);
  }
}
