import { inject, TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [LoginService]
    });

    service = TestBed.inject(LoginService);
  });

  it('LoginService service should be created', inject([LoginService], () => {
    expect(service).toBeTruthy();
  }));

});
