import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../../lib/http/http.service';

import { cities } from '../_mocks/cities';
import { CityModel } from '../_moodels/city.model';
import { CityWeatherModel } from '../_moodels/city-weather.model';
import { Observable, of } from 'rxjs';


@Injectable()
export class MyWeatherService {
  constructor(
    private readonly http: HttpService
  ) { }

  getCityWeather(idCity: number): Observable<CityWeatherModel> {
    const url = `${environment.baseUrl}weather?id=${idCity}&APPID=${environment.apiKey}`;

    return this.http.get<CityWeatherModel>(url);
  }

  getCitiesList(): Observable<CityModel[]> {

    return of(cities);
  }

  addUserCity(city: CityModel): Observable<boolean> {
    const localKey = `cities-${localStorage.getItem('logged-user')}`;
    const storage = localStorage.getItem(localKey);
    let citiesList = JSON.parse(storage !== null ? storage : '[]') as CityModel[];
    if (citiesList)
      if (citiesList.find(x => x.id === city.id) === undefined) {
        citiesList.push(city);
        localStorage.setItem(localKey, JSON.stringify(citiesList));
      }
    return of(true);
  }

  removeUserCity(cities: number[]): Observable<boolean> {
    const localKey = `cities-${localStorage.getItem('logged-user')}`
    const citiesList = JSON.parse(localStorage.getItem(localKey) as string) as CityModel[];
    cities.forEach(idCity => {
      const index = citiesList.findIndex(x => x.id === idCity);
      if (index !== -1) {
        citiesList.splice(index, 1);
        localStorage.setItem(localKey, JSON.stringify(citiesList));
      }
    })
    return of(true);
  }

  getUserCities(): Observable<CityModel[]> {
    const localKey = `cities-${localStorage.getItem('logged-user')}`
    return of(JSON.parse(localStorage.getItem(localKey) as string) as CityModel[]);
  }
}
