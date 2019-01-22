import { createCli, ICli } from "../cli";
import { ICommand } from "../commands";
import { ILogger } from "../logger";
import { buildArgv } from "../test-utils/argv";
import { createMockCommand, IMockCommandOptions } from "../test-utils/mock-command";
import { createMockLogger } from "../test-utils/mock-logger";

describe("cli", () => {
  let mockLogger: ILogger;
  let mockCommand: ICommand<IMockCommandOptions>;
  let cli: ICli;
  const cliDescription = "cli-description";

  beforeEach(() => {
    mockLogger = createMockLogger();
    mockCommand = createMockCommand(mockLogger);
    cli = createCli(
      {
        commands: [mockCommand],
        description: cliDescription,
      },
      mockLogger,
    );
  });

  it("should inform user and reject if no command is provided", async () => {
    expect.assertions(2);

    try {
      await cli.start(buildArgv(""));
    } catch (error) {
      expect(mockLogger.error).toHaveBeenCalledTimes(1);
      expect(mockLogger.error).toHaveBeenCalledWith("Please provide a command 😅");
    }
  });

  it("should inform user and reject if no command is provided", async () => {
    expect.assertions(2);

    try {
      await cli.start(["test", "index.js"]);
    } catch (error) {
      expect(mockLogger.error).toHaveBeenCalledTimes(1);
      expect(mockLogger.error).toHaveBeenCalledWith("Please provide a command 😅");
    }
  });

  it("should inform user and reject if the command is not recognised", async () => {
    expect.assertions(2);
    const unknownCommand = "unknown";

    try {
      await cli.start(buildArgv(unknownCommand));
    } catch (error) {
      expect(mockLogger.error).toHaveBeenCalledTimes(1);
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Command '${unknownCommand}' not recognised 😱`,
      );
    }
  });

  it("should run the command", async () => {
    const value = "test-value";
    await cli.start(buildArgv(`mock ${value}`));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledWith(value);
  });

  it("should run the command with options", async () => {
    const value = "test-value";

    await cli.start(buildArgv(`mock ${value} -c`));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledWith(value.toUpperCase());
  });

  it("should output the executing package version (longhand)", async () => {
    await cli.start(buildArgv("--version"));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledWith(process.env.npm_package_version);
  });

  it("should output the executing package version (shorthand)", async () => {
    await cli.start(buildArgv("-v"));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledWith(process.env.npm_package_version);
  });

  it("should output the cli help (longhand)", async () => {
    await cli.start(buildArgv("--help"));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);

    // Type escape hatch to obtain mock
    const mockLog: any = mockLogger.log;
    const log = mockLog.mock.calls[0][0];

    expect(log.includes(cliDescription)).toBe(true);
    expect(log.includes(mockCommand.name)).toBe(true);
    expect(log.includes(mockCommand.description)).toBe(true);
  });

  it("should output the cli help (shorthand)", async () => {
    await cli.start(buildArgv("-h"));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);

    // Type escape hatch to obtain mock
    const mockLog: any = mockLogger.log;
    const log = mockLog.mock.calls[0][0];

    expect(log.includes(cliDescription)).toBe(true);
    expect(log.includes(mockCommand.name)).toBe(true);
    expect(log.includes(mockCommand.description)).toBe(true);
  });
});
