import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { LogService } from '../log/log.service';

describe('HttpService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        LogService,
      ],
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('service should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));

  it('http error in get should call handleError',
    inject([HttpService], (service: HttpService) => {
      const handleErrorSpy = spyOn(service, 'handleError');
      service.get('test').subscribe({
        error: () => {
          expect(handleErrorSpy).toHaveBeenCalled();
        }
      });
      const req = httpMock.expectOne('test');
      expect(req.request.method).toEqual('GET');
      req.flush({ status: 400, statusText: 'Bad Request' });
    }));

  it('handleError default error',
    inject([HttpService], (service: HttpService) => {
      const error = new HttpErrorResponse({ url: 'url', status: 400, error: { message: 'error' } });
      service.handleError(error).subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('Something bad happened; please try again later.'));
        }
      });
    }));

  it('handleError event error',
    inject([HttpService], (service: HttpService) => {
      const error = new HttpErrorResponse({ url: 'url', status: 400, error: new ErrorEvent('error', undefined) });
      service.handleError(error).subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('Something bad happened; please try again later.'));
        }
      });
    }));
});
