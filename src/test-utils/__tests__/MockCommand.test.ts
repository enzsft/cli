import { MockCommand } from "../MockCommand";

describe("MockCommand", () => {
  it("should yield all values", () => {
    const command = new MockCommand();
    const values = ["one", "two", "three"];

    const iterator = command.handler(values, { capitalize: false });
    for (const value of values) {
      expect(iterator.next()).toEqual({ done: false, value });
    }

    expect(iterator.next()).toEqual({ done: true, value: undefined });
  });

  it("should yield all values capitalized", () => {
    const command = new MockCommand();
    const values = ["one", "two", "three"];

    const iterator = command.handler(values, { capitalize: true });
    for (const value of values.map(x => x.toUpperCase())) {
      expect(iterator.next()).toEqual({ done: false, value });
    }

    expect(iterator.next()).toEqual({ done: true, value: undefined });
  });
});
