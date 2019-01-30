import parseArgs from "minimist";
import { ICommand } from "./commands";
import { createLogger, ILogger } from "./logger";
import { transformParsedOptions } from "./options";
import { getHighestLength } from "./utils";

/**
 * A CLI to parse Argv and run commands
 */
export interface ICli {
  /**
   * Start the CLI
   */
  start: (argv: string[]) => Promise<void>;
}

/**
 * Config for CLI
 */
export interface ICliConfig {
  /**
   * Commands that can be run
   */
  commands: Array<ICommand<any>>;
  /**
   * Description of the CLI tool. This is output in --help,
   */
  description: string;
  /**
   * Name of the CLI tool. This is output in --help and should match the
   * executable name.
   */
  name: string;
}

/**
 * Create the default CLI
 *
 * @param config
 * @param logger
 */
export const createCli = (
  config: ICliConfig,
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
        // This is one of the few places prettier lets us down 😢
        logger.log(`
${config.description}

Options:

${indent}--help, --h   ${indent}Display tool help.
${indent}--version, --v${indent}Display tool version.

Usage: ${config.name} [command] [options...]

Commands:

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
