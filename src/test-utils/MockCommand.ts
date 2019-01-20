import { BooleanOption } from "../BooleanOption";
import { ICommand } from "../types/ICommand";
import { ILogger } from "../types/ILogger";

export interface IMockCommandOptions {
  capitalize: boolean;
}

/**
 * Mock command for tests
 */
export class MockCommand implements ICommand<IMockCommandOptions> {
  public name = "mock";

  public options = [new BooleanOption("capitalize", "c", false, false)];

  constructor(private logger: ILogger) {}

  public handler = (values: string[], options: IMockCommandOptions) => {
    for (const value of values) {
      this.logger.log(options.capitalize ? value.toUpperCase() : value);
    }

    return Promise.resolve();
  };
}
