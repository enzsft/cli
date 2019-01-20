import { BooleanOption, ICommand } from "../../src";

export interface IEchoOptions {
  capitalize: boolean;
}

export class Echo implements ICommand<IEchoOptions> {
  public name = "echo";

  public options = [new BooleanOption("capitalize", "c", false, false)];

  public handler = function*(values: string[], options: IEchoOptions) {
    for (const value of values) {
      yield options.capitalize ? value.toUpperCase() : value;
    }
  };
}
