import { OptionType } from "./OptionType";
import { IOption } from "./types/IOption";

/**
 * Boolean option, ensures the type injected into a command is a boolean
 */
export class BooleanOption implements IOption<boolean> {
  public type: OptionType;

  constructor(public name: string, public shorthand: string, public required: boolean, public defaultValue?: boolean) {
    this.type = OptionType.boolean;
  }
}
