import { buildArgv } from "../argv";

describe("buildArgv", () => {
  it("should construct argv array", () => {
    expect(buildArgv("command")).toEqual(["test", "index.js", "command"]);
  });
});
