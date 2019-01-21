import {
  createBooleanOption,
  createNumberOption,
  createStringOption,
  OptionType,
  transformParsedOptions,
} from "../options";

describe("boolean option", () => {
  it("createBooleanOption() should create a boolean option", () => {
    const option = createBooleanOption("mock", "m", false, true);

    expect(option).toMatchObject({
      defaultValue: true,
      name: "mock",
      required: false,
      shorthand: "m",
      type: OptionType.boolean,
    });
  });

  it("should parse boolean correctly", () => {
    const option = createBooleanOption("mock", "m", false, true);

    expect(option.parse("true")).toBe(true);
    expect(option.parse("123")).toBe(true);
    expect(option.parse("")).toBe(true);
    expect(option.parse("false")).toBe(false);
  });
});

describe("number option", () => {
  it("createNumberOption() should create a number option", () => {
    const option = createNumberOption("mock", "m", false, 123);

    expect(option).toMatchObject({
      defaultValue: 123,
      name: "mock",
      required: false,
      shorthand: "m",
      type: OptionType.number,
    });
  });

  it("should parse number correctly", () => {
    const option = createNumberOption("mock", "m", false, 123);

    expect(option.parse("1")).toBe(1);
    expect(option.parse("")).toBe(NaN);
    expect(option.parse("0")).toBe(0);
    expect(option.parse("123")).toBe(123);
  });
});

describe("string option", () => {
  it("createStringOption() should create a string option", () => {
    const option = createStringOption("mock", "m", false, "default-value");

    expect(option).toMatchObject({
      defaultValue: "default-value",
      name: "mock",
      required: false,
      shorthand: "m",
      type: OptionType.string,
    });
  });

  it("should parse string correctly", () => {
    const option = createStringOption("mock", "m", false, "default-value");

    expect(option.parse("")).toBe("");
    expect(option.parse("hello")).toBe("hello");
    expect(option.parse("true")).toBe("true");
    expect(option.parse("123")).toBe("123");
  });
});

describe("transformParsedOptions", () => {
  it("should return options as correct types", () => {
    expect(
      transformParsedOptions(
        {
          aa: "true",
          bb: "hello",
          cc: "1",
        },
        [
          createBooleanOption("aa", "a", false),
          createStringOption("bb", "b", false),
          createNumberOption("cc", "c", false),
        ],
      ),
    ).toEqual({
      aa: true,
      bb: "hello",
      cc: 1,
    });
  });

  it("should return options with default values", () => {
    expect(transformParsedOptions({}, [createBooleanOption("aa", "a", false, true)])).toEqual({
      aa: true,
    });

    expect(
      transformParsedOptions({ aa: "" }, [createBooleanOption("aa", "a", false, true)]),
    ).toEqual({
      aa: true,
    });
  });

  it("should throw if required option is not provided", () => {
    expect(() => transformParsedOptions({}, [createBooleanOption("aa", "a", true)])).toThrowError();
  });

  it("should transform shorthand option into full name options", () => {
    expect(transformParsedOptions({ a: "true" }, [createBooleanOption("aa", "a", false)])).toEqual({
      aa: true,
    });
  });

  it("should ignore unknown options", () => {
    expect(
      transformParsedOptions({ aa: true, bb: "unknown" }, [createBooleanOption("aa", "a", false)]),
    ).toEqual({
      aa: true,
    });
  });
});
