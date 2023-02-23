import { Injectable } from '@angular/core';

export enum LogLevel {
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error'
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  public log(level: LogLevel, msg: string, param?: unknown): void {
    const finalMessage = `${msg}${this.formatParam(param)}`;
    this.sendLog(level, finalMessage);
  }

  private sendLog(level: LogLevel, message: string): void {
    // eslint-disable-next-line no-console
    console[level](`${new Date().toISOString()} - ${message}`);
  }

  private formatParam(param: unknown): string {
    let ret = '';
    if (param) {
      ret = `, ${JSON.stringify(param, Object.getOwnPropertyNames(param))}`;
    }
    return ret;
  }
}
