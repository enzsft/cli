import { ILogger } from "../logger";

export const createMockLogger = (): ILogger => ({
  error: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
});
