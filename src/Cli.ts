import parseArgs from "minimist";
import { ICli } from "./ICli";
import { ICommand } from "./ICommand";
import { OptionsTransformer } from "./OptionsTransformer";

/**
 * A CLI to process argv and run commands
 */
export class Cli implements ICli {
  private commands: Array<ICommand<any>>;

  constructor(config: { commands: Array<ICommand<any>> }) {
    this.commands = config.commands;
  }

  public start = (argv: string[]) => {
    const { _, ...options } = parseArgs(argv.slice(2));

    // Guard against no command
    if (_.length === 0) {
      throw new Error("Please provide a command 😅");
    }

    const [commandName] = _;
    const command = this.commands.find(x => x.name === commandName);

    // Guard against unknown command
    if (!command) {
      throw new Error(`Command '${commandName}' not recognised 😱`);
    }

    // Capture yielded logs from command
    const optionsTransformer = new OptionsTransformer(command.options);
    const iterator = command.handler(_.slice(1), optionsTransformer.transform(options));
    const logs = [];

    while (true) {
      const { done, value } = iterator.next();

      if (done) {
        break;
      }

      logs.push(value);
    }

    // Return all yielded logs from the command
    return Promise.resolve(logs);
  };
}
