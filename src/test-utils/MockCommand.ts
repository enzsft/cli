import { ICommand } from "../ICommand";
import { BooleanOption } from "../options/BooleanOption";

export interface IMockCommandOptions {
  capitalize: boolean;
}

/**
 * Mock command for tests
 */
export class MockCommand implements ICommand<IMockCommandOptions> {
  public name = "mock";

  public options = [new BooleanOption("capitalize", "c", false, false)];

  public handler = function*(values: string[], options: IMockCommandOptions) {
    for (const value of values) {
      yield options.capitalize ? value.toUpperCase() : value;
    }
  };
}
