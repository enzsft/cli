import { IOption } from "./IOption";
import { OptionType } from "./OptionType";

export class StringOption implements IOption<string> {
  public type: OptionType;

  constructor(public name: string, public shorthand: string, public required: boolean, public defaultValue?: string) {
    this.type = OptionType.string;
  }
}
