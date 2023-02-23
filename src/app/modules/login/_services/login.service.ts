import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { users } from '../_mocks/users';


@Injectable()
export class LoginService {
  constructor(
  ) { }

  logged = new BehaviorSubject<boolean>(false);

  logIn(user: string, password: string): Observable<boolean> {
    let userLogged = users.find(x => x.user === user && x.password === password);
    if (userLogged) {
      localStorage.setItem('logged-user', userLogged.user);
      this.logged.next(true);
    }
    return of(userLogged !== undefined);
  }

  logOut(): Observable<boolean> {
    let status = false
    localStorage.removeItem('logged-user')
    this.logged.next(false);
    return of(status);
  }

  validateLogin() {
    this.logged.next(localStorage.getItem('logged-user') !== null);
  }
}
