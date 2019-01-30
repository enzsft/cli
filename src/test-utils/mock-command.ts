import { ICommand } from "../commands";
import { ILogger } from "../logger";
import {
  createBooleanOption,
  createNumberOption,
  createStringOption,
} from "../options";

/**
 * Mock comands options
 */
export interface IMockCommandOptions {
  /**
   * Should the values be aptizalized.
   */
  capitalize: boolean;
}

export const mockBooleanOption = createBooleanOption({
  altName: "c",
  defaultValue: false,
  description: "mock-boolean-description",
  name: "capitalize",
  required: false,
});

export const mockNumberOption = createNumberOption({
  altName: "num",
  defaultValue: 123,
  description: "mock-number-description",
  name: "number",
  required: false,
});

export const mockStringOption = createStringOption({
  defaultValue: "mock-string-value",
  description: "mock-description",
  name: "string",
  required: false,
});

/**
 * Mock command for tests
 */
export const createMockCommand = (
  logger: ILogger,
): ICommand<IMockCommandOptions> => ({
  description: "A mock command for tests",
  handler: (values: string[], options: IMockCommandOptions) => {
    for (const value of values) {
      logger.log(options.capitalize ? value.toUpperCase() : value);
    }

    return Promise.resolve();
  },
  name: "mock",
  options: [mockBooleanOption, mockNumberOption, mockStringOption],
});
