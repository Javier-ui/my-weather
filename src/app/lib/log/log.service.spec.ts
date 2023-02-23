import { inject, TestBed } from '@angular/core/testing';

import { LogLevel, LogService } from './log.service';

describe('LogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogService
      ]
    });
  });

  it('service should be created', inject([LogService], (service: LogService) => {
    expect(service).toBeTruthy();
  }));

  it('log() message without param should be well formated', inject([LogService], (service: LogService) => {
    const sendLogSpy = spyOn<any>(service, 'sendLog');

    const level = LogLevel.debug;
    const message = 'Test message';
    service.log(level, message, null);

    const itemExpected = 'Test message';
    expect(sendLogSpy).toHaveBeenCalledWith(level, itemExpected);
  }));

  it('log() message with param should be well formated', inject([LogService], (service: LogService) => {
    const sendLogSpy = spyOn<any>(service, 'sendLog');

    const level = LogLevel.error;
    const message = 'Test message';
    const err = {
      message: 'error found',
      stack: 'Error: error found at ...'
    };
    service.log(level, message, err);

    const itemExpected = 'Test message, {"message":"error found","stack":"Error: error found at ..."}';
    expect(sendLogSpy).toHaveBeenCalledWith(level, itemExpected);
  }));

});
