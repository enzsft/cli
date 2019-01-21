import parseArgs from "minimist";
import { ICommand } from "./commands";
import { createLogger, ILogger } from "./logger";
import { transformParsedOptions } from "./options";

export interface ICli {
  start: (argv: string[]) => Promise<void>;
}

export const createCli = (
  config: { commands: Array<ICommand<any>> },
  logger: ILogger = createLogger(),
): ICli => ({
  start: async (argv: string[]) => {
    const { _, ...options } = parseArgs(argv.slice(2));

    // Guard against no command
    if (_.length === 0) {
      logger.error("Please provide a command 😅");
      return Promise.reject();
    }

    const [commandName] = _;
    const command = config.commands.find(x => x.name === commandName);

    // Guard against unknown command
    if (!command) {
      logger.error(`Command '${commandName}' not recognised 😱`);
      return Promise.reject();
    }

    // Capture yielded logs from command
    await command.handler(_.slice(1), transformParsedOptions(options, command.options));

    // Return all yielded logs from the command
    return Promise.resolve();
  },
});
