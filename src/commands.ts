import { IOption } from "./options";

export interface ICommand<TOptions> {
  description: string;
  name: string;
  options: Array<IOption<unknown>>;
  handler: (values: string[], options: TOptions) => Promise<void>;
}
