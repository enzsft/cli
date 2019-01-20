import { Cli } from "../../..";
import { buildArgv } from "../../../test-utils";
import { ILogger } from "../../services/ILogger";
import { Echo } from "../Echo";

export class MockLogger implements ILogger {
  public error = jest.fn();
  public info = jest.fn();
  public log = jest.fn();
  public warn = jest.fn();
}

describe("Echo", () => {
  const values = ["one", "two", "three"];
  let mockLogger: ILogger;
  let echoCommand: Echo;

  beforeEach(() => {
    mockLogger = new MockLogger();
    echoCommand = new Echo(mockLogger);
  });

  it("should echo all values back", async () => {
    const cli = new Cli({ commands: [echoCommand] });

    await cli.start(buildArgv(`echo ${values.join(" ")}`));

    expect(mockLogger.log).toHaveBeenCalledTimes(3);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x);
    });
  });

  it("should echo all values back capitalized", async () => {
    const cli = new Cli({ commands: [echoCommand] });

    await cli.start(buildArgv(`echo ${values.join(" ")} --capitalize`));

    expect(mockLogger.log).toHaveBeenCalledTimes(3);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x.toUpperCase());
    });
  });

  it("should echo all values back capitalized", async () => {
    const cli = new Cli({ commands: [echoCommand] });

    await cli.start(buildArgv(`echo ${values.join(" ")} -c`));

    expect(mockLogger.log).toHaveBeenCalledTimes(3);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x.toUpperCase());
    });
  });
});
