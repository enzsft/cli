import { NumberOption } from "../NumberOption";
import { OptionType } from "../OptionType";

describe("NumberOption", () => {
  it("should construct the option correctly", () => {
    expect(new NumberOption("aa", "a", false, 1)).toMatchObject({
      defaultValue: 1,
      name: "aa",
      required: false,
      shorthand: "a",
      type: OptionType.number,
    });

    expect(new NumberOption("aa", "a", false)).toMatchObject({
      defaultValue: undefined,
      name: "aa",
      required: false,
      shorthand: "a",
      type: OptionType.number,
    });
  });
});
