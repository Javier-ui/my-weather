import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { environment } from '../../../../environments/environment';
import { CityWeatherModel } from '../_moodels/city-weather.model';
import { MyWeatherService } from './my-weather.service';

describe('MyWeatherService', () => {
  let service: MyWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [MyWeatherService]
    });

    service = TestBed.inject(MyWeatherService);
  });

  it('MyWeatherService service should be created', inject([MyWeatherService], () => {
    expect(service).toBeTruthy();
  }));

  it('should receive list of mocked city info', inject([HttpTestingController], (httpMock: HttpTestingController) => {

    const url = `${environment.baseUrl}weather?id=0&APPID=${environment.apiKey}`;
    const cityWeather = new CityWeatherModel();
    service.getCityWeather(0).subscribe((res) => {
      expect(res).toEqual(cityWeather);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(cityWeather);

    httpMock.verify();
  }));
});
