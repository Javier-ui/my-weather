import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { MaterialExampleModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './modules/login/_services/login.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        BrowserModule,
        GoogleMapsModule,
        FormsModule,
        HttpClientModule,
        MatNativeDateModule,
        MaterialExampleModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RouterModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        LoginService,
        Router
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should navigate to login when logged is false', () => {
    const spy = spyOn<any>(component['router'], 'navigateByUrl');
    component['login'].logged.next(false);
    expect(spy).toHaveBeenCalledWith(`login`);
  });

  it('Should navigate to myweather when logged is true', () => {
    const spy = spyOn<any>(component['router'], 'navigateByUrl');
    component['login'].logged.next(true);
    expect(spy).toHaveBeenCalledWith(`myweather`);
  });


});
