import { IOption } from "./options/IOption";
import { OptionType } from "./options/OptionType";

/**
 * Transforms options parsed from argv into options usable by a command
 */
export class OptionsTransformer {
  /**
   * Construct OptionsTransformer
   * @param commandOptions Command options used to transform options objects
   */
  constructor(private commandOptions: Array<IOption<unknown>>) {
    // Validate all type as early as possible
    commandOptions.forEach(x => this.getTypeFactory(x.type));
  }

  /**
   * Transform an options object parsed from argv into an options object usable by a command
   */
  public transform = (options: { [arg: string]: any }) => {
    // Options names provided
    const providedNames = Object.keys(options);

    // Some may be shorthand so transform them into full names
    const refinedNames = providedNames.map(x => {
      const option = this.commandOptions.find(s => s.name === x || s.shorthand === x);

      return option && option.name;
    });

    // Throw if a required option is missing
    this.commandOptions.forEach(s => {
      if (s.required && !refinedNames.find(x => s.name === x)) {
        throw new Error(`Option '${s.name}' is required 😅`);
      }
    });

    // Construct options object
    // Filters out unknown options
    const transformedOptions = refinedNames.reduce((acc, next, i) => {
      const optionSpec = this.commandOptions.filter(s => s.name === next)[0];
      const providedOption = optionSpec && this.getTypeFactory(optionSpec.type)(options[providedNames[i]]);

      return next && providedOption ? { ...acc, [next]: providedOption } : acc;
    }, {});

    // Fill in default options
    const defaultOptions = this.commandOptions.reduce((acc, next) => ({ ...acc, [next.name]: next.defaultValue }), {});

    return {
      ...defaultOptions,
      ...transformedOptions,
    };
  };

  /**
   * Return function to cast
   */
  private getTypeFactory = (type: OptionType) => {
    switch (type) {
      case OptionType.boolean:
        return (x: string) => x !== "false";
      case OptionType.number:
        return (x: string) => parseFloat(x);
      case OptionType.string:
        return (x: string) => x;
      default:
        throw new Error(`Type '${type}' is not supported 😭`);
    }
  };
}
