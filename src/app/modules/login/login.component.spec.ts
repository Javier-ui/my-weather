import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { LoginService } from './_services/login.service';

/* eslint-disable @typescript-eslint/no-magic-numbers */

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [LoginComponent],
      providers: [
        LoginService,
        Router,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Correct login should navigate toi myweather', () => {
    spyOn<any>(component['loginService'], 'logIn').and.returnValue(of(true));
    const spy = spyOn<any>(component['router'], 'navigateByUrl');
    component.login();
    expect(spy).toHaveBeenCalledWith(`myweather`);
  });

  it('Wrong login should change showError to false', () => {
    spyOn<any>(component['loginService'], 'logIn').and.returnValue(of(true));
    component.login();
    expect(component.showError).toBeFalse();
  });
});
