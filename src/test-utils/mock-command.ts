import { ICommand } from "../commands";
import { ILogger } from "../logger";
import { createBooleanOption } from "../options";

export interface IMockCommandOptions {
  capitalize: boolean;
}

/**
 * Mock command for tests
 */
export const createMockCommand = (logger: ILogger): ICommand<IMockCommandOptions> => ({
  description: "A mock command for tests",
  handler: (values: string[], options: IMockCommandOptions) => {
    for (const value of values) {
      logger.log(options.capitalize ? value.toUpperCase() : value);
    }

    return Promise.resolve();
  },
  name: "mock",
  options: [createBooleanOption("capitalize", "c", false, false)],
});
