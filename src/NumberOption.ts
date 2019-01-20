import { OptionType } from "./OptionType";
import { IOption } from "./types/IOption";

/**
 * Number option, ensures the type injected into a command is a number
 */
export class NumberOption implements IOption<number> {
  public type: OptionType;

  constructor(public name: string, public shorthand: string, public required: boolean, public defaultValue?: number) {
    this.type = OptionType.number;
  }
}
