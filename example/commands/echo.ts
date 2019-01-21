import { createBooleanOption, ICommand } from "../..";
import { ILogger } from "../services/logger";

export interface IEchoCommandOptions {
  capitalize: boolean;
}

export const createEchoCommand = (logger: ILogger): ICommand<IEchoCommandOptions> => ({
  handler: (values: string[], options: IEchoCommandOptions) => {
    for (const value of values) {
      logger.log(options.capitalize ? value.toUpperCase() : value);
    }

    return Promise.resolve();
  },
  name: "echo",
  options: [createBooleanOption("capitalize", "c", false, false)],
});
