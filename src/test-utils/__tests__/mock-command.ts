import { ICommand } from "../../commands";
import { ILogger } from "../../logger";
import { createMockCommand, IMockCommandOptions } from "../mock-command";
import { createMockLogger } from "../mock-logger";

describe("MockCommand", () => {
  let mockLogger: ILogger;
  let mockCommand: ICommand<IMockCommandOptions>;

  beforeEach(() => {
    mockLogger = createMockLogger();
    mockCommand = createMockCommand(mockLogger);
  });

  it("should log all values", async () => {
    const values = ["one", "two", "three"];

    await mockCommand.handler(values, { capitalize: false });
    expect(mockLogger.log).toHaveBeenCalledTimes(3);

    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x);
    });
  });

  it("should yield all values capitalized", async () => {
    const values = ["one", "two", "three"];

    await mockCommand.handler(values, { capitalize: true });
    expect(mockLogger.log).toHaveBeenCalledTimes(3);

    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x.toUpperCase());
    });
  });
});
