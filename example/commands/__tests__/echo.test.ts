import { createCli, Command } from "../../.."; // ... from "@enzsft/cli"
import { buildArgv } from "../../../test-utils"; // ... from "@enzsft/cli/test-utils"
import { Logger } from "../../services/logger";
import { createEchoCommand, EchoCommandOptions } from "../echo";

const createMockLogger = (): Logger => ({
  error: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
});

describe("Echo", () => {
  const values = ["one", "two", "three"];
  let mockLogger: Logger;
  let echoCommand: Command<EchoCommandOptions>;
  const description = "cli-description";
  const name = "cli-name";
  const version = "1.0.0";

  beforeEach(() => {
    mockLogger = createMockLogger();
    echoCommand = createEchoCommand(mockLogger);
  });

  it("should echo all values back", async () => {
    const cli = createCli({
      commands: [echoCommand],
      description,
      name,
      version,
    });

    await cli.start(buildArgv(`echo ${values.join(" ")}`));

    expect(mockLogger.log).toHaveBeenCalledTimes(3);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x);
    });
  });

  it("should echo all values back capitalized", async () => {
    const cli = createCli({
      commands: [echoCommand],
      description,
      name,
      version,
    });

    await cli.start(buildArgv(`echo ${values.join(" ")} --capitalize`));

    expect(mockLogger.log).toHaveBeenCalledTimes(3);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x.toUpperCase());
    });
  });

  it("should echo all values back capitalized", async () => {
    const cli = createCli({
      commands: [echoCommand],
      description,
      name,
      version,
    });

    await cli.start(buildArgv(`echo ${values.join(" ")} -c`));

    expect(mockLogger.log).toHaveBeenCalledTimes(3);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x.toUpperCase());
    });
  });
});
