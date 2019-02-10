import { createCli, ICli } from "../cli";
import { ICommand } from "../commands";
import { ILogger } from "../logger";
import { buildArgv } from "../test-utils/argv";
import {
  createMockCommand,
  IMockCommandOptions,
  mockBooleanOption,
  mockNumberOption,
  mockStringOption,
} from "../test-utils/mock-command";
import { createMockLogger } from "../test-utils/mock-logger";

describe("cli", () => {
  let mockLogger: ILogger;
  let mockCommand: ICommand<IMockCommandOptions>;
  let cli: ICli;
  const cliDescription = "cli-description";
  const cliName = "cli-name";

  beforeEach(() => {
    mockLogger = createMockLogger();
    mockCommand = createMockCommand(mockLogger);
    cli = createCli(
      {
        commands: [mockCommand],
        description: cliDescription,
        name: cliName,
        version: "1.0.0",
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
      expect(mockLogger.error).toHaveBeenCalledWith(
        "Please provide a command 😅",
      );
    }
  });

  it("should inform user and reject if no command is provided", async () => {
    expect.assertions(2);

    try {
      await cli.start(["node", cliName]);
    } catch (error) {
      expect(mockLogger.error).toHaveBeenCalledTimes(1);
      expect(mockLogger.error).toHaveBeenCalledWith(
        "Please provide a command 😅",
      );
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

  it("should output the executing package version (name)", async () => {
    await cli.start(buildArgv("--version"));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledWith("1.0.0");
  });

  it("should output the executing package version (alternative name)", async () => {
    await cli.start(buildArgv("-v"));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledWith("1.0.0");
  });

  it("should output the cli help (name)", async () => {
    await cli.start(buildArgv("--help"));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);

    // Type escape hatch to obtain mock
    const mockLog: any = mockLogger.log;
    const log = mockLog.mock.calls[0][0];

    // CLI
    expect(log.includes(`Usage: ${cliName} [command] [options...]`)).toBe(true);
    expect(log.includes(cliDescription)).toBe(true);

    // CLI options
    expect(log.includes("--help, --h       Display tool help.")).toBe(true);
    expect(log.includes("--version, --v    Display tool version.")).toBe(true);

    // Command
    expect(log.includes(mockCommand.name)).toBe(true);
    expect(log.includes(mockCommand.description)).toBe(true);

    // Command options
    expect(
      log.includes(
        `--${mockBooleanOption.name}, --${mockBooleanOption.altName}`,
      ),
    ).toBe(true);
    expect(log.includes(mockBooleanOption.description)).toBe(true);

    expect(
      log.includes(`--${mockNumberOption.name}, --${mockNumberOption.altName}`),
    ).toBe(true);
    expect(log.includes(``)).toBe(true);
    expect(log.includes(mockNumberOption.description)).toBe(true);

    // No alternative name
    expect(log.includes(`--${mockStringOption.name}`)).toBe(true);
    expect(log.includes(mockStringOption.description)).toBe(true);
  });

  it("should output the cli help (alternative name)", async () => {
    await cli.start(buildArgv("-h"));

    expect(mockLogger.log).toHaveBeenCalledTimes(1);

    // Type escape hatch to obtain mock
    const mockLog: any = mockLogger.log;
    const log = mockLog.mock.calls[0][0];

    // CLI
    expect(log.includes(`Usage: ${cliName} [command] [options...]`)).toBe(true);
    expect(log.includes(cliDescription)).toBe(true);

    // CLI options
    expect("--help, --h       Display tool help.");
    expect("--version, --v    Display the tool version.");

    // Command
    expect(log.includes(mockCommand.name)).toBe(true);
    expect(log.includes(mockCommand.description)).toBe(true);

    // Command options
    expect(
      log.includes(
        `--${mockBooleanOption.name}, --${mockBooleanOption.altName}`,
      ),
    ).toBe(true);
    expect(log.includes(mockBooleanOption.description)).toBe(true);

    expect(
      log.includes(`--${mockNumberOption.name}, --${mockNumberOption.altName}`),
    ).toBe(true);
    expect(log.includes(``)).toBe(true);
    expect(log.includes(mockNumberOption.description)).toBe(true);

    // No alternative name
    expect(log.includes(`--${mockStringOption.name}`)).toBe(true);
    expect(log.includes(mockStringOption.description)).toBe(true);
  });
});
