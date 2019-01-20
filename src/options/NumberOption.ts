import { IOption } from "./IOption";
import { OptionType } from "./OptionType";

export class NumberOption implements IOption<number> {
  public type: OptionType;

  constructor(public name: string, public shorthand: string, public required: boolean, public defaultValue?: number) {
    this.type = OptionType.number;
  }
}
