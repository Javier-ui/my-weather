import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, takeUntil } from 'rxjs';
import { LogService } from 'src/app/lib/log/log.service';
import { BaselineComponent } from '../../lib/baseline/baseline.component';
import { LoginService } from '../login/_services/login.service';
import { CityWeatherModel } from './_moodels/city-weather.model';
import { CityModel } from './_moodels/city.model';
import { MyWeatherService } from './_services/my-weather.service';

@Component({
  selector: 'my-weather',
  templateUrl: './my-weather.component.html',
  styleUrls: ['./my-weather.component.scss'],
})
export class MyWeatherComponent extends BaselineComponent implements OnInit {

  // Configuración de Google Maps 
  center = { lat: 50, lng: 50 };
  temp = 0;
  zoom = 15;
  //display?: google.maps.LatLngLiteral;
  showMap = false;

  myControl = new FormControl('');
  imgBaseUrl = 'http://openweathermap.org/img/wn/{ICON_STRING}@2x.png';
  imgUrl = '';
  filteredCities: Observable<string[]> | undefined;
  cities: CityModel[] = [];
  userCities: CityModel[] = [];
  citiesToRemove: number[] = [];
  selectedCity: CityModel[] = [];
  value = ''
  constructor(
    protected readonly service: MyWeatherService,
    protected readonly login: LoginService,
    protected readonly log: LogService,
  ) {
    super();
  }

  ngOnInit() {
    this.service.getCitiesList().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: CityModel[]) => {
      this.cities = data;
    });
    this.service.getUserCities().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: CityModel[]) => {
      this.userCities = data;
    });
    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  public addCity(nameCity: string) {
    let city = this.cities.find(x => x.name === nameCity)
    this.service.addUserCity(city as CityModel).pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
      this.getUserCities();
    });
  }

  public removeCity() {
    this.service.removeUserCity(this.citiesToRemove).pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
      this.getUserCities();
      this.citiesToRemove = [];
    });
  }

  public checkCity(idCity: number) {
    let index = this.citiesToRemove.findIndex(x => x === idCity)
    if (index === -1) {
      this.citiesToRemove.push(idCity);
    } else {
      this.citiesToRemove.splice(index, 1);
    }
  }

  public selectCity(city: CityModel) {
    this.showMap = false;
    this.selectedCity = [city];
    this.service.getCityWeather(city.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: CityWeatherModel) => {
      this.center.lat = data.coord.lat;
      this.center.lng = data.coord.lon;

      this.temp = data.main.temp - 273.15;
      this.showMap = true;
      this.imgUrl = this.imgBaseUrl.replace('{ICON_STRING}', data.weather[0].icon)

    });
  }

  private getUserCities() {
    this.service.getUserCities().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: CityModel[]) => {
      this.userCities = data;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.map(data => data.name).filter(option => option.toLowerCase().includes(filterValue));
  }
}
