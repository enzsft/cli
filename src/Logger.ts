// tslint:disable no-console

export interface ILogger {
  error: (message?: any) => void;
  info: (message?: any) => void;
  log: (message?: any) => void;
  warn: (message?: any) => void;
}

/**
 * Simple logger
 */
export const createLogger = (): ILogger => ({
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
});
