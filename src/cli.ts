import parseArgs from "minimist";
import { Cli, CliConfig, Logger } from "./types";
import { createLogger } from "./logger";
import { transformParsedOptions } from "./options";
import { getHighestLength } from "./utils";

/**
 * Create the default CLI
 *
 * @param {Object} config Configuration
 * @param {Object} logger A logger
 * @returns {Object} A cli
 */
export const createCli = (
  config: CliConfig,
  logger: Logger = createLogger(),
): Cli => ({
  start: async (argv: string[]): Promise<void> => {
    const { _, ...options } = parseArgs(argv.slice(2));

    // Guard against no command
    if (_.length === 0) {
      // May be asking for version
      if (options.version || options.v) {
        logger.log(config.version);
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
    x => `${indent}${x.name.padEnd(commandWidth)}${indent}${x.description}
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
