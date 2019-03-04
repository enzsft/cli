// tslint:disable no-console

export interface Logger {
  error: (message?: any) => void;
  info: (message?: any) => void;
  log: (message?: any) => void;
  warn: (message?: any) => void;
}

/**
 * Simple logger
 * @returns {Object} A logger
 */
export const createLogger = (): Logger => ({
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
});
