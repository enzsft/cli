import { ILogger } from "../types/ILogger";

export class MockLogger implements ILogger {
  public error = jest.fn();
  public info = jest.fn();
  public log = jest.fn();
  public warn = jest.fn();
}
