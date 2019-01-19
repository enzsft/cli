import { OptionsTransformer } from "../OptionsTransformer";

describe("OptionsTansformer", () => {
  it("should return options as correct types", () => {
    const optionsTransformer = new OptionsTransformer([
      {
        name: "aa",
        required: false,
        shorthand: "a",
        type: "boolean",
      },
      {
        name: "bb",
        required: false,
        shorthand: "b",
        type: "string",
      },
      {
        name: "cc",
        required: false,
        shorthand: "c",
        type: "number",
      },
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
    const optionsTransformer = new OptionsTransformer([
      {
        default: true,
        name: "aa",
        required: false,
        shorthand: "a",
        type: "boolean",
      },
    ]);

    expect(optionsTransformer.transform({})).toEqual({
      aa: true,
    });
    expect(optionsTransformer.transform({ aa: "" })).toEqual({
      aa: true,
    });
  });

  it("should throw if required option is not provided", () => {
    const optionsTransformer = new OptionsTransformer([
      {
        name: "aa",
        required: true,
        shorthand: "a",
        type: "boolean",
      },
    ]);

    expect(() => optionsTransformer.transform({})).toThrowError();
  });

  it("should transform shorthand option into full name options", () => {
    const optionsTransformer = new OptionsTransformer([
      {
        name: "aa",
        required: false,
        shorthand: "a",
        type: "boolean",
      },
    ]);

    expect(
      optionsTransformer.transform({
        a: "true",
      }),
    ).toEqual({
      aa: true,
    });
  });

  it("should throw if an option type isn't supported", () => {
    expect(
      () =>
        new OptionsTransformer([
          {
            name: "aa",
            required: false,
            shorthand: "a",
            type: "unknown",
          },
        ]),
    ).toThrowError();
  });

  it("should ignore unknown options", () => {
    const optionsTransformer = new OptionsTransformer([
      {
        name: "aa",
        required: false,
        shorthand: "a",
        type: "boolean",
      },
    ]);

    expect(optionsTransformer.transform({ aa: true, bb: "unknown" })).toEqual({
      aa: true,
    });
  });
});
