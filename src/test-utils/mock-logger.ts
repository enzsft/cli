import { Logger } from "../types";

export const createMockLogger = (): Logger => ({
  error: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
});
