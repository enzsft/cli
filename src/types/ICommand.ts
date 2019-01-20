import { IOption } from "./IOption";

export interface ICommand<TOptions> {
  name: string;
  options: Array<IOption<unknown>>;
  handler: (values: string[], options: TOptions) => Promise<void>;
}
