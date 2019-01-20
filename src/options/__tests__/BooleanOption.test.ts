import { BooleanOption } from "../BooleanOption";
import { OptionType } from "../OptionType";

describe("BooleanOption", () => {
  it("should construct the option correctly", () => {
    expect(new BooleanOption("aa", "a", false, true)).toMatchObject({
      defaultValue: true,
      name: "aa",
      required: false,
      shorthand: "a",
      type: OptionType.boolean,
    });

    expect(new BooleanOption("aa", "a", false)).toMatchObject({
      defaultValue: undefined,
      name: "aa",
      required: false,
      shorthand: "a",
      type: OptionType.boolean,
    });
  });
});
