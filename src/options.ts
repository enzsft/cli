export enum OptionType {
  boolean = "boolean",
  number = "number",
  string = "string",
}

export interface IOption<TType> {
  altName: string;
  description: string;
  name: string;
  parse: (value: string) => TType;
  type: OptionType;
  required: boolean;
  defaultValue?: TType;
}

export interface IOptionConfig<TType> {
  altName: string;
  description: string;
  name: string;
  required: boolean;
  defaultValue?: TType;
}

export const createBooleanOption = (
  config: IOptionConfig<boolean>,
): IOption<boolean> => ({
  ...config,
  parse: (x: string) => x !== "false",
  type: OptionType.boolean,
});

export const createNumberOption = (
  config: IOptionConfig<number>,
): IOption<number> => ({
  ...config,
  parse: (x: string) => parseFloat(x),
  type: OptionType.number,
});

export const createStringOption = (
  config: IOptionConfig<string>,
): IOption<string> => ({
  ...config,
  parse: (x: string) => x,
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

  // Some may be alternative names so transform them into names
  const refinedNames = providedNames.map(x => {
    const option = commandOptions.find(s => s.name === x || s.altName === x);

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
