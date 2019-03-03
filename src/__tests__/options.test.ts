import { OptionType } from "../types";
import {
  createBooleanOption,
  createNumberOption,
  createStringOption,
  transformParsedOptions,
} from "../options";

describe("boolean option", () => {
  it("createBooleanOption() should create a boolean option", () => {
    const option = createBooleanOption({
      altName: "m",
      defaultValue: true,
      description: "mock-description",
      name: "mock",
      required: false,
    });

    expect(option).toMatchObject({
      altName: "m",
      defaultValue: true,
      name: "mock",
      required: false,
      type: OptionType.boolean,
    });
  });

  it("should parse boolean correctly", () => {
    const option = createBooleanOption({
      altName: "m",
      defaultValue: true,
      description: "mock-description",
      name: "mock",
      required: false,
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
      altName: "m",
      defaultValue: 123,
      description: "mock-description",
      name: "mock",
      required: false,
    });

    expect(option).toMatchObject({
      altName: "m",
      defaultValue: 123,
      description: "mock-description",
      name: "mock",
      required: false,
      type: OptionType.number,
    });
  });

  it("should parse number correctly", () => {
    const option = createNumberOption({
      altName: "m",
      description: "mock-description",
      name: "mock",
      required: false,
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
      altName: "m",
      defaultValue: "default-value",
      description: "mock-description",
      name: "mock",
      required: false,
    });

    expect(option).toMatchObject({
      altName: "m",
      defaultValue: "default-value",
      description: "mock-description",
      name: "mock",
      required: false,
      type: OptionType.string,
    });
  });

  it("should parse string correctly", () => {
    const option = createStringOption({
      altName: "m",
      defaultValue: "default-value",
      description: "mock-description",
      name: "mock",
      required: false,
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
            altName: "a",
            description: "mock-description",
            name: "aa",
            required: false,
          }),
          createStringOption({
            altName: "b",
            description: "mock-description",
            name: "bb",
            required: false,
          }),
          createNumberOption({
            altName: "c",
            description: "mock-description",
            name: "cc",
            required: false,
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
          altName: "a",
          defaultValue: true,
          description: "mock-description",
          name: "aa",
          required: false,
        }),
      ]),
    ).toEqual({
      aa: true,
    });

    expect(
      transformParsedOptions({ aa: "" }, [
        createBooleanOption({
          altName: "a",
          defaultValue: true,
          description: "mock-description",
          name: "aa",
          required: false,
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
          altName: "a",
          description: "mock-description",
          name: "aa",
          required: true,
        }),
      ]),
    ).toThrowError();
  });

  it("should transform alternative name options into name options", () => {
    expect(
      transformParsedOptions({ a: "true" }, [
        createBooleanOption({
          altName: "a",
          description: "mock-description",
          name: "aa",
          required: false,
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
          altName: "a",
          description: "mock-description",
          name: "aa",
          required: false,
        }),
      ]),
    ).toEqual({
      aa: true,
    });
  });
});
