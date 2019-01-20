// tslint:disable no-console

import { ILogger } from "./ILogger";

/**
 * Simple logger
 */
export class Logger implements ILogger {
  public error = console.error;
  public info = console.info;
  public log = console.log;
  public warn = console.warn;
}
