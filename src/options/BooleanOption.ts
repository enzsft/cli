import { IOption } from "./IOption";
import { OptionType } from "./OptionType";

export class BooleanOption implements IOption<boolean> {
  public type: OptionType;

  constructor(public name: string, public shorthand: string, public required: boolean, public defaultValue?: boolean) {
    this.type = OptionType.boolean;
  }
}
