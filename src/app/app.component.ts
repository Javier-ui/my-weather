import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaselineComponent } from './lib/baseline/baseline.component';
import { LoginService } from './modules/login/_services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaselineComponent implements OnInit {
  logged = false;

  constructor(
    protected readonly login: LoginService,
    protected readonly router: Router,
  ) {
    super();
  }
  public ngOnInit() {
    this.login.logged.pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: boolean) => {
      console.log('entra');
      this.logged = result;
      if (!this.logged) {
        this.router.navigateByUrl(`login`);
      } else {
        this.router.navigateByUrl(`myweather`);
      }
    });
    this.login.validateLogin();
  }

  public logout() {
    this.login.logOut().pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }
}
