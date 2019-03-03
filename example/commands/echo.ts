import { createBooleanOption, Command } from "../.."; // ... from "@enzsft/cli"
import { Logger } from "../services/logger";

export interface EchoCommandOptions {
  capitalize: boolean;
}

export const createEchoCommand = (
  logger: Logger,
): Command<EchoCommandOptions> => ({
  description: "Echos back string values.",
  handler: (values: string[], options: EchoCommandOptions) => {
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
