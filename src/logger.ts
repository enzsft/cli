// tslint:disable no-console

/**
 * A simple logger.
 */
export interface ILogger {
  /**
   * Log an error.
   */
  error: (message?: any) => void;
  /**
   * Log some info.
   */
  info: (message?: any) => void;
  /**
   * Log a log.
   */
  log: (message?: any) => void;
  /**
   * Log a warning.
   */
  warn: (message?: any) => void;
}

/**
 * A simple console logger.
 */
export const createLogger = (): ILogger => ({
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
});
