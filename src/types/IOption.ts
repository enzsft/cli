import { OptionType } from "../OptionType";

export interface IOption<TType> {
  name: string;
  shorthand: string;
  type: OptionType;
  required: boolean;
  defaultValue?: TType;
}
