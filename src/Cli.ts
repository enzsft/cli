import parseArgs from "minimist";
import { Logger } from "./Logger";
import { OptionsTransformer } from "./OptionsTransformer";
import { ICli } from "./types/ICli";
import { ICommand } from "./types/ICommand";
import { ILogger } from "./types/ILogger";

/**
 * A CLI to process argv and run commands
 */
export class Cli implements ICli {
  private commands: Array<ICommand<any>>;
  private logger: ILogger;

  constructor(config: { commands: Array<ICommand<any>>; logger?: ILogger }) {
    this.commands = config.commands;
    this.logger = config.logger || new Logger();
  }

  public start = async (argv: string[]) => {
    const { _, ...options } = parseArgs(argv.slice(2));

    // Guard against no command
    if (_.length === 0) {
      this.logger.error("Please provide a command 😅");
      return Promise.reject();
    }

    const [commandName] = _;
    const command = this.commands.find(x => x.name === commandName);

    // Guard against unknown command
    if (!command) {
      this.logger.error(`Command '${commandName}' not recognised 😱`);
      return Promise.reject();
    }

    // Capture yielded logs from command
    const optionsTransformer = new OptionsTransformer(command.options);
    await command.handler(_.slice(1), optionsTransformer.transform(options));

    // Return all yielded logs from the command
    return Promise.resolve();
  };
}
