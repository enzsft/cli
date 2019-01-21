export enum OptionType {
  boolean = "boolean",
  number = "number",
  string = "string",
}

export interface IOption<TType> {
  name: string;
  parse: (value: string) => TType;
  shorthand: string;
  type: OptionType;
  required: boolean;
  defaultValue?: TType;
}

export const createBooleanOption = (
  name: string,
  shorthand: string,
  required: boolean,
  defaultValue?: boolean,
): IOption<boolean> => ({
  defaultValue,
  name,
  parse: (x: string) => x !== "false",
  required,
  shorthand,
  type: OptionType.boolean,
});

export const createNumberOption = (
  name: string,
  shorthand: string,
  required: boolean,
  defaultValue?: number,
): IOption<number> => ({
  defaultValue,
  name,
  parse: (x: string) => parseFloat(x),
  required,
  shorthand,
  type: OptionType.number,
});

export const createStringOption = (
  name: string,
  shorthand: string,
  required: boolean,
  defaultValue?: string,
): IOption<string> => ({
  defaultValue,
  name,
  parse: (x: string) => x,
  required,
  shorthand,
  type: OptionType.string,
});

/**
 * Transform an options object parsed from argv into an options object usable by a command
 */
export const transformParsedOptions = (
  options: { [arg: string]: any },
  commandOptions: Array<IOption<unknown>>,
) => {
  // Options names provided
  const providedNames = Object.keys(options);

  // Some may be shorthand so transform them into full names
  const refinedNames = providedNames.map(x => {
    const option = commandOptions.find(s => s.name === x || s.shorthand === x);

    return option && option.name;
  });

  // Throw if a required option is missing
  commandOptions.forEach(s => {
    if (s.required && !refinedNames.find(x => s.name === x)) {
      throw new Error(`Option '${s.name}' is required 😅`);
    }
  });

  // Construct options object
  // Filters out unknown options
  const transformedOptions = refinedNames.reduce((acc, next, i) => {
    const option = commandOptions.filter(s => s.name === next)[0];
    const providedOption = option && option.parse(options[providedNames[i]]);

    return next && providedOption ? { ...acc, [next]: providedOption } : acc;
  }, {});

  // Fill in default options
  const defaultOptions = commandOptions.reduce(
    (acc, next) => ({ ...acc, [next.name]: next.defaultValue }),
    {},
  );

  return {
    ...defaultOptions,
    ...transformedOptions,
  };
};
