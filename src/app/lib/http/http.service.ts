import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LogLevel, LogService } from '../log/log.service';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(
    private readonly http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      catchError(this.handleError)
    );
  }

  handleError(this: void, error: HttpErrorResponse): Observable<never> {
    const logService = new LogService();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      logService.log(LogLevel.error, `An error occurred while executing ${error.url}:${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      logService.log(LogLevel.error, `Backend request ${error.url} returned code ${error.status}, message: ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}
