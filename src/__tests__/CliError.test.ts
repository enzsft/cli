import { CliError } from "../CliError";

describe("CliError", () => {
  it("should implement Error", () => {
    const message = "Oops!";
    const error = new CliError(message);

    expect(error instanceof Error).toBe(true);
    expect(error.message).toBe(message);
  });
});
