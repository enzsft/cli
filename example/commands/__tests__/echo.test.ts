import { createCli, ICommand } from "../../..";
import { buildArgv } from "../../../test-utils";
import { ILogger } from "../../services/logger";
import { createEchoCommand, IEchoCommandOptions } from "../echo";

const createMockLogger = (): ILogger => ({
  error: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
});

describe("Echo", () => {
  const values = ["one", "two", "three"];
  let mockLogger: ILogger;
  let echoCommand: ICommand<IEchoCommandOptions>;
  const description = "cli-description";
  const name = "cli-name";

  beforeEach(() => {
    mockLogger = createMockLogger();
    echoCommand = createEchoCommand(mockLogger);
  });

  it("should echo all values back", async () => {
    const cli = createCli({ commands: [echoCommand], description, name });

    await cli.start(buildArgv(`echo ${values.join(" ")}`));

    expect(mockLogger.log).toHaveBeenCalledTimes(3);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x);
    });
  });

  it("should echo all values back capitalized", async () => {
    const cli = createCli({ commands: [echoCommand], description, name });

    await cli.start(buildArgv(`echo ${values.join(" ")} --capitalize`));

    expect(mockLogger.log).toHaveBeenCalledTimes(3);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x.toUpperCase());
    });
  });

  it("should echo all values back capitalized", async () => {
    const cli = createCli({ commands: [echoCommand], description, name });

    await cli.start(buildArgv(`echo ${values.join(" ")} -c`));

    expect(mockLogger.log).toHaveBeenCalledTimes(3);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x.toUpperCase());
    });
  });
});
