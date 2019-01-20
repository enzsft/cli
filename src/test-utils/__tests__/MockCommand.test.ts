import { ILogger } from "../../types/ILogger";
import { MockCommand } from "../MockCommand";
import { MockLogger } from "../MockLogger";

describe("MockCommand", () => {
  let mockLogger: ILogger;
  let mockCommand: MockCommand;

  beforeEach(() => {
    mockLogger = new MockLogger();
    mockCommand = new MockCommand(mockLogger);
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
