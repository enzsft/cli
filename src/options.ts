/**
 * Possible types of options.
 */
export enum OptionType {
  boolean = "boolean",
  number = "number",
  string = "string",
}

/**
 * An option.
 */
export interface IOption<TType> {
  /**
   * An alternative name an option can be referenced by. This is output
   * in --help,
   */
  altName?: string;
  /**
   * A description of the option. This is output in --help,
   */
  description: string;
  /**
   * The name of the option. This is output in --help,
   */
  name: string;
  /**
   * Parse option from a string parsed from Argv into the specified type.
   */
  parse: (value: string) => TType;
  /**
   * The type to parse the option to when it is injected into the
   * commands handler.
   */
  type: OptionType;
  /**
   * Whether the option is required or not.
   */
  required: boolean;
  /**
   * The default value of the option if it not provided via Argv.
   */
  defaultValue?: TType;
}

/**
 * Config to build an option.
 */
export interface IOptionConfig<TType> {
  /**
   * An alternative name an option can be referenced by. This is output
   * in --help,
   */
  altName?: string;
  /**
   * A description of the option. This is output in --help,
   */
  description: string;
  /**
   * The name of the option. This is output in --help,
   */
  name: string;
  /**
   * Whether the option is required or not.
   */
  required: boolean;
  /**
   * The default value of the option if it not provided via Argv.
   */
  defaultValue?: TType;
}

/**
 * Create a boolean option.
 *
 * @param config
 */
export const createBooleanOption = (
  config: IOptionConfig<boolean>,
): IOption<boolean> => ({
  ...config,
  parse: (x: string): boolean => x !== "false",
  type: OptionType.boolean,
});

/**
 * Create a boolean option.
 *
 * @param config
 */
export const createNumberOption = (
  config: IOptionConfig<number>,
): IOption<number> => ({
  ...config,
  parse: (x: string): number => parseFloat(x),
  type: OptionType.number,
});

/**
 * Create a boolean option.
 *
 * @param config
 */
export const createStringOption = (
  config: IOptionConfig<string>,
): IOption<string> => ({
  ...config,
  parse: (x: string): string => x,
  type: OptionType.string,
});

/**
 * Transform an options object parsed from argv into an options object usable by a command
 *
 * @param options
 * @param commandOptions
 */
export const transformParsedOptions = (
  options: { [arg: string]: any },
  commandOptions: Array<IOption<unknown>>,
): { [arg: string]: any } => {
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
