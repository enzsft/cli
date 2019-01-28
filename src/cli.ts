import parseArgs from "minimist";
import { ICommand } from "./commands";
import { createLogger, ILogger } from "./logger";
import { transformParsedOptions } from "./options";
import { getHighestLength } from "./utils";

export interface ICli {
  start: (argv: string[]) => Promise<void>;
}

export const createCli = (
  config: { commands: Array<ICommand<any>>; description: string; name: string },
  logger: ILogger = createLogger(),
): ICli => ({
  start: async (argv: string[]) => {
    const { _, ...options } = parseArgs(argv.slice(2));

    // Guard against no command
    if (_.length === 0) {
      // May be asking for version
      if (options.version || options.v) {
        logger.log(process.env.npm_package_version);
        return Promise.resolve();
      }

      // May be asking for help
      if (options.help || options.h) {
        const indent = "    ";
        // Align commands descriptions on the right
        const commandWidth = getHighestLength(config.commands.map(x => x.name));

        // Align option descriptions on the right
        const optionWidths: { [key: string]: number } = config.commands.reduce(
          (acc, next) => ({
            ...acc,
            [next.name]: getHighestLength(
              next.options.map(
                x => `--${x.name}${x.altName ? `, --${x.altName}` : ""}`,
              ),
            ),
          }),
          {},
        );

        // Brace yourself... formatted CLI output coming right up!
        logger.log(`
${config.description}

Options:

${indent}--help, --h   ${indent}Display tool help.
${indent}--version, --v${indent}Display tool version.

Commands:

Usage: ${config.name} [command] [options...]

${config.commands
          .map(
            x => `${indent}${x.name.padEnd(commandWidth)}${indent}${
              x.description
            }
${x.options
              .map(
                o =>
                  `
${indent}${"".padEnd(commandWidth)}${indent}${`--${o.name}${
                    o.altName ? `, --${o.altName}` : ""
                  }`.padEnd(optionWidths[x.name])}${indent}${o.description}`,
              )
              .join("")}
`,
          )
          .join(`\n`)}
`);

        return Promise.resolve();
      }

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

    // Execute command
    await command.handler(
      _.slice(1),
      transformParsedOptions(options, command.options),
    );

    return Promise.resolve();
  },
});
