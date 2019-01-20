import { Cli } from "../../../src";
import { buildArgv } from "../../../src/test-utils";
import { Echo } from "../echo";

describe("Echo", () => {
  it("should echo all values back", async () => {
    const values = ["one", "two", "three"];
    const cli = new Cli({ commands: [new Echo()] });

    const logs = await cli.start(buildArgv(`echo ${values.join(" ")}`));

    expect(logs).toEqual(values);
  });

  it("should echo all values back capitalized", async () => {
    const values = ["one", "two", "three"];
    const cli = new Cli({ commands: [new Echo()] });

    expect(await cli.start(buildArgv(`echo ${values.join(" ")} --capitalize`))).toEqual(
      values.map(x => x.toUpperCase()),
    );

    expect(await cli.start(buildArgv(`echo ${values.join(" ")} -c`))).toEqual(values.map(x => x.toUpperCase()));
  });
});
