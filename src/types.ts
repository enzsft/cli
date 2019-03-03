/**
 * A CLI to parse Argv and run commands
 */
export interface Cli {
  /**
   * Start the CLI
   */
  start: (argv: string[]) => Promise<void>;
}

/**
 * Config for CLI
 */
export interface CliConfig {
  /**
   * Commands that can be run
   */
  commands: Command<any>[];
  /**
   * Description of the CLI tool. This is output in --help,
   */
  description: string;
  /**
   * Name of the CLI tool. This is output in --help and should match the
   * executable name.
   */
  name: string;
  /**
   * Version of the CLI tool. This is output in --version
   */
  version: string;
}

/**
 * Command that can be run in via the CLI
 */
export interface Command<TOptions> {
  /**
   * Description of the command. This is output in --help,
   */
  description: string;
  /**
   * Name of the command. The command name is parsed out of Argv and matched
   * to this to determine which command to execute. This is output in --help.
   */
  name: string;
  /**
   * Options that can be injected into the commands handler function. These
   * are parsed out of Argv.
   */
  options: Option<unknown>[];
  /**
   * Function executed when a command is being run.
   */
  handler: (values: string[], options: TOptions) => Promise<void>;
}

/**
 * A simple logger.
 */
export interface Logger {
  /**
   * Log an error.
   */
  error: (message?: any) => void;
  /**
   * Log some info.
   */
  info: (message?: any) => void;
  /**
   * Log a log.
   */
  log: (message?: any) => void;
  /**
   * Log a warning.
   */
  warn: (message?: any) => void;
}
/**
 * Possible types of options.
 */
export enum OptionType {
  boolean = "boolean",
  number = "number",
  string = "string",
}

/**
 * An option.
 */
export interface Option<TType> {
  /**
   * An alternative name an option can be referenced by. This is output
   * in --help,
   */
  altName?: string;
  /**
   * A description of the option. This is output in --help,
   */
  description: string;
  /**
   * The name of the option. This is output in --help,
   */
  name: string;
  /**
   * Parse option from a string parsed from Argv into the specified type.
   */
  parse: (value: string) => TType;
  /**
   * The type to parse the option to when it is injected into the
   * commands handler.
   */
  type: OptionType;
  /**
   * Whether the option is required or not.
   */
  required: boolean;
  /**
   * The default value of the option if it not provided via Argv.
   */
  defaultValue?: TType;
}

/**
 * Config to build an option.
 */
export interface OptionConfig<TType> {
  /**
   * An alternative name an option can be referenced by. This is output
   * in --help,
   */
  altName?: string;
  /**
   * A description of the option. This is output in --help,
   */
  description: string;
  /**
   * The name of the option. This is output in --help,
   */
  name: string;
  /**
   * Whether the option is required or not.
   */
  required: boolean;
  /**
   * The default value of the option if it not provided via Argv.
   */
  defaultValue?: TType;
}
