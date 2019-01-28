import { createBooleanOption, ICommand } from "../.."; // ... from "@enzsft/cli"
import { ILogger } from "../services/logger";

export interface IEchoCommandOptions {
  capitalize: boolean;
}

export const createEchoCommand = (
  logger: ILogger,
): ICommand<IEchoCommandOptions> => ({
  description: "Echos back string values.",
  handler: (values: string[], options: IEchoCommandOptions) => {
    for (const value of values) {
      logger.log(options.capitalize ? value.toUpperCase() : value);
    }

    return Promise.resolve();
  },
  name: "echo",
  options: [
    createBooleanOption({
      altName: "c",
      defaultValue: false,
      description: "Capitalize all string values.",
      name: "capitalize",
      required: false,
    }),
  ],
});
