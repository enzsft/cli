import { OptionType } from "./OptionType";
import { IOption } from "./types/IOption";

/**
 * String option, ensures the type injected into a command is a string
 */
export class StringOption implements IOption<string> {
  public type: OptionType;

  constructor(public name: string, public shorthand: string, public required: boolean, public defaultValue?: string) {
    this.type = OptionType.string;
  }
}
