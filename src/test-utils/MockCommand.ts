import { ICommand } from "../types/ICommand";

export interface IMockCommandOptions {
  capitalize: boolean;
}

/**
 * Mock command for tests
 */
export class MockCommand implements ICommand<IMockCommandOptions> {
  public name = "mock";

  public options = [
    {
      default: false,
      name: "capitalize",
      required: false,
      shorthand: "c",
      type: "boolean",
    },
  ];

  public handler = function*(values: string[], options: IMockCommandOptions) {
    for (const value of values) {
      yield options.capitalize ? value.toUpperCase() : value;
    }
  };
}
