import { OptionType } from "../OptionType";
import { StringOption } from "../StringOption";

describe("StringOption", () => {
  it("should construct the option correctly", () => {
    expect(new StringOption("aa", "a", false, "one")).toMatchObject({
      defaultValue: "one",
      name: "aa",
      required: false,
      shorthand: "a",
      type: OptionType.string,
    });

    expect(new StringOption("aa", "a", false)).toMatchObject({
      defaultValue: undefined,
      name: "aa",
      required: false,
      shorthand: "a",
      type: OptionType.string,
    });
  });
});
