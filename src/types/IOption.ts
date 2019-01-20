export interface IOption<TType> {
  name: string;
  shorthand: string;
  type: string;
  required: boolean;
  default?: TType;
}
