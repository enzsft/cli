import { getHighestLength } from "../utils";

describe("getHighestLength", () => {
  it("should return the highest length", () => {
    expect(getHighestLength(["one", "two", "three"])).toBe(5);
    expect(getHighestLength(["one", "three", "two"])).toBe(5);
    expect(getHighestLength(["three", "one", "two"])).toBe(5);
  });
});
