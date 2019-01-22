import { createCli, ICli } from "../cli";
import { ILogger } from "../logger";
import { buildArgv } from "../test-utils/argv";
import { createMockCommand } from "../test-utils/mock-command";
import { createMockLogger } from "../test-utils/mock-logger";

describe("cli", () => {
  let mockLogger: ILogger;
  let cli: ICli;
  const cliDescription = "cli-description";

  beforeEach(() => {
    mockLogger = createMockLogger();
    cli = createCli(
      {
        commands: [createMockCommand(mockLogger)],
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

  it("should output the executing package version", async () => {
    await cli.start(buildArgv("--version"));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledWith(process.env.npm_package_version);
  });

  it("should output the executing package version", async () => {
    await cli.start(buildArgv("-v"));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledWith(process.env.npm_package_version);
  });

  it("should output the cli description", async () => {
    await cli.start(buildArgv("--help"));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledWith(cliDescription);
  });

  it("should output the cli description", async () => {
    await cli.start(buildArgv("-h"));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledWith(cliDescription);
  });
});
