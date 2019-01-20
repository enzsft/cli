import { Cli } from "../Cli";
import { buildArgv } from "../test-utils/buildArgv";
import { MockCommand } from "../test-utils/MockCommand";
import { MockLogger } from "../test-utils/MockLogger";
import { ICli } from "../types/ICli";
import { ILogger } from "../types/ILogger";

describe("Cli", () => {
  let mockLogger: ILogger;
  let cli: ICli;

  beforeEach(() => {
    mockLogger = new MockLogger();
    cli = new Cli({
      commands: [new MockCommand(mockLogger)],
      logger: mockLogger,
    });
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
      expect(mockLogger.error).toHaveBeenCalledWith(`Command '${unknownCommand}' not recognised 😱`);
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
});
