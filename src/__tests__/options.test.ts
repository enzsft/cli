import {
  createBooleanOption,
  createNumberOption,
  createStringOption,
  OptionType,
  transformParsedOptions,
} from "../options";

describe("boolean option", () => {
  it("createBooleanOption() should create a boolean option", () => {
    const option = createBooleanOption({
      defaultValue: true,
      description: "mock-description",
      name: "mock",
      required: false,
      shorthand: "m",
    });

    expect(option).toMatchObject({
      defaultValue: true,
      name: "mock",
      required: false,
      shorthand: "m",
      type: OptionType.boolean,
    });
  });

  it("should parse boolean correctly", () => {
    const option = createBooleanOption({
      defaultValue: true,
      description: "mock-description",
      name: "mock",
      required: false,
      shorthand: "m",
    });

    expect(option.parse("true")).toBe(true);
    expect(option.parse("123")).toBe(true);
    expect(option.parse("")).toBe(true);
    expect(option.parse("false")).toBe(false);
  });
});

describe("number option", () => {
  it("createNumberOption() should create a number option", () => {
    const option = createNumberOption({
      defaultValue: 123,
      description: "mock-description",
      name: "mock",
      required: false,
      shorthand: "m",
    });

    expect(option).toMatchObject({
      defaultValue: 123,
      description: "mock-description",
      name: "mock",
      required: false,
      shorthand: "m",
      type: OptionType.number,
    });
  });

  it("should parse number correctly", () => {
    const option = createNumberOption({
      description: "mock-description",
      name: "mock",
      required: false,
      shorthand: "m",
    });

    expect(option.parse("1")).toBe(1);
    expect(option.parse("")).toBe(NaN);
    expect(option.parse("0")).toBe(0);
    expect(option.parse("123")).toBe(123);
  });
});

describe("string option", () => {
  it("createStringOption() should create a string option", () => {
    const option = createStringOption({
      defaultValue: "default-value",
      description: "mock-description",
      name: "mock",
      required: false,
      shorthand: "m",
    });

    expect(option).toMatchObject({
      defaultValue: "default-value",
      description: "mock-description",
      name: "mock",
      required: false,
      shorthand: "m",
      type: OptionType.string,
    });
  });

  it("should parse string correctly", () => {
    const option = createStringOption({
      defaultValue: "default-value",
      description: "mock-description",
      name: "mock",
      required: false,
      shorthand: "m",
    });

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
          createBooleanOption({
            description: "mock-description",
            name: "aa",
            required: false,
            shorthand: "a",
          }),
          createStringOption({
            description: "mock-description",
            name: "bb",
            required: false,
            shorthand: "b",
          }),
          createNumberOption({
            description: "mock-description",
            name: "cc",
            required: false,
            shorthand: "c",
          }),
        ],
      ),
    ).toEqual({
      aa: true,
      bb: "hello",
      cc: 1,
    });
  });

  it("should return options with default values", () => {
    expect(
      transformParsedOptions({}, [
        createBooleanOption({
          defaultValue: true,
          description: "mock-description",
          name: "aa",
          required: false,
          shorthand: "a",
        }),
      ]),
    ).toEqual({
      aa: true,
    });

    expect(
      transformParsedOptions({ aa: "" }, [
        createBooleanOption({
          defaultValue: true,
          description: "mock-description",
          name: "aa",
          required: false,
          shorthand: "a",
        }),
      ]),
    ).toEqual({
      aa: true,
    });
  });

  it("should throw if required option is not provided", () => {
    expect(() =>
      transformParsedOptions({}, [
        createBooleanOption({
          description: "mock-description",
          name: "aa",
          required: true,
          shorthand: "a",
        }),
      ]),
    ).toThrowError();
  });

  it("should transform shorthand option into full name options", () => {
    expect(
      transformParsedOptions({ a: "true" }, [
        createBooleanOption({
          description: "mock-description",
          name: "aa",
          required: false,
          shorthand: "a",
        }),
      ]),
    ).toEqual({
      aa: true,
    });
  });

  it("should ignore unknown options", () => {
    expect(
      transformParsedOptions({ aa: true, bb: "unknown" }, [
        createBooleanOption({
          description: "mock-description",
          name: "aa",
          required: false,
          shorthand: "a",
        }),
      ]),
    ).toEqual({
      aa: true,
    });
  });
});
