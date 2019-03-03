import { Logger } from "./types";

/**
 * A simple console logger.
 *
 * @returns {Logger} A logger
 */
export const createLogger = (): Logger => ({
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
});
