export interface ILogger {
  error: (message?: any) => void;
  info: (message?: any) => void;
  log: (message?: any) => void;
  warn: (message?: any) => void;
}
