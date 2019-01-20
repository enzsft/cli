import { BooleanOption } from "../options/BooleanOption";
import { NumberOption } from "../options/NumberOption";
import { StringOption } from "../options/StringOption";
import { OptionsTransformer } from "../OptionsTransformer";

describe("OptionsTansformer", () => {
  it("should return options as correct types", () => {
    const optionsTransformer = new OptionsTransformer([
      new BooleanOption("aa", "a", false),
      new StringOption("bb", "b", false),
      new NumberOption("cc", "c", false),
    ]);

    expect(
      optionsTransformer.transform({
        aa: "true",
        bb: "hello",
        cc: "1",
      }),
    ).toEqual({
      aa: true,
      bb: "hello",
      cc: 1,
    });
  });

  it("should return options with default values", () => {
    const optionsTransformer = new OptionsTransformer([new BooleanOption("aa", "a", false, true)]);

    expect(optionsTransformer.transform({})).toEqual({
      aa: true,
    });
    expect(optionsTransformer.transform({ aa: "" })).toEqual({
      aa: true,
    });
  });

  it("should throw if required option is not provided", () => {
    const optionsTransformer = new OptionsTransformer([new BooleanOption("aa", "a", true)]);

    expect(() => optionsTransformer.transform({})).toThrowError();
  });

  it("should transform shorthand option into full name options", () => {
    const optionsTransformer = new OptionsTransformer([new BooleanOption("aa", "a", false)]);

    expect(
      optionsTransformer.transform({
        a: "true",
      }),
    ).toEqual({
      aa: true,
    });
  });

  it("should throw if an option type isn't supported", () => {
    expect(() => new OptionsTransformer([{ name: "aa", shorthand: "a", type: 999, required: false }])).toThrowError();
  });

  it("should ignore unknown options", () => {
    const optionsTransformer = new OptionsTransformer([new BooleanOption("aa", "a", false)]);

    expect(optionsTransformer.transform({ aa: true, bb: "unknown" })).toEqual({
      aa: true,
    });
  });
});
