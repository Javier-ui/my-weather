import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BaselineComponent } from './baseline.component';

describe('BaselineComponent', () => {
  let component: BaselineComponent;
  let fixture: ComponentFixture<BaselineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BaselineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaselineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
