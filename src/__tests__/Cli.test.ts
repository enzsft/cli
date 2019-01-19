import { Cli } from "../Cli";
import { buildArgv, MockCommand } from "../test-utils";

describe("Cli", () => {
  const cli = new Cli({
    commands: [new MockCommand()],
  });

  it("should throw if no command is present", () => {
    expect(() => {
      cli.start(buildArgv(""));
    }).toThrowError();

    expect(() => {
      cli.start(["test", "index.js"]);
    }).toThrowError();
  });

  it("should throw if the command is not recognised", () => {
    expect(() => {
      cli.start(buildArgv("unknown"));
    }).toThrowError();
  });

  it("should run the command", async () => {
    const value = "test-value";

    const logs = await cli.start(buildArgv(`mock ${value}`));

    expect(logs).toEqual([value]);
  });

  it("should run the command with options", async () => {
    const value = "test-value";

    const logs = await cli.start(buildArgv(`mock ${value} -c`));

    expect(logs).toEqual([value.toUpperCase()]);
  });
});
