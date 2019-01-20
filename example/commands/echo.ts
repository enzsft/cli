import { BooleanOption, ICommand } from "../..";
import { ILogger } from "../services/ILogger";

export interface IEchoOptions {
  capitalize: boolean;
}

export class Echo implements ICommand<IEchoOptions> {
  public name = "echo";

  public options = [new BooleanOption("capitalize", "c", false, false)];

  constructor(public logger: ILogger) {}

  public handler = (values: string[], options: IEchoOptions) => {
    for (const value of values) {
      this.logger.log(options.capitalize ? value.toUpperCase() : value);
    }

    return Promise.resolve();
  };
}
