import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaselineComponent } from '../../lib/baseline/baseline.component';
import { LoginService } from './_services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaselineComponent {

  loginAction = true;
  hide = true;
  userValue = '';
  passwordValue = '';
  showError = false;
  constructor(
    protected loginService: LoginService,
    private readonly router: Router,

  ) {
    super();
  }

  public login() {
    this.loginService.logIn(this.userValue, this.passwordValue).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      if (response) {
        this.showError = false;
        this.router.navigateByUrl(`myweather`);
      } else {
        this.showError = true;
      }
    });
  }

}


