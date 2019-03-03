import { Option, OptionConfig, OptionType } from "./types";

/**
 * Create a boolean option.
 *
 * @param {ConfigOption<boolean>} config Boolean option config
 * @returns {Option<boolean>} A boolean
 */
export const createBooleanOption = (
  config: OptionConfig<boolean>,
): Option<boolean> => ({
  ...config,
  parse: (x: string): boolean => x !== "false",
  type: OptionType.boolean,
});

/**
 * Create a number option.
 *
 * @param {ConfigOption<number>} config Number option config
 * @returns {Option<number>} A number
 */
export const createNumberOption = (
  config: OptionConfig<number>,
): Option<number> => ({
  ...config,
  parse: (x: string): number => parseFloat(x),
  type: OptionType.number,
});

/**
 * Create a string option.
 *
 * @param {ConfigOption<string>} config String option config
 * @returns {Option<string>} A string
 */
export const createStringOption = (
  config: OptionConfig<string>,
): Option<string> => ({
  ...config,
  parse: (x: string): string => x,
  type: OptionType.string,
});

/**
 * Transform an options object parsed from argv into an options object usable by a command.
 *
 * @param {any} options The options object to parse
 * @param {Option<any>} commandOptions The options the command expects
 * @returns {any} Object with parsed options
 */
export const transformParsedOptions = (
  options: { [arg: string]: any },
  commandOptions: Option<unknown>[],
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
