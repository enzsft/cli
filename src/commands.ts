import { IOption } from "./options";

/**
 * Command that can be run in via the CLI
 */
export interface ICommand<TOptions> {
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
  options: Array<IOption<unknown>>;
  /**
   * Function executed when a command is being run.
   */
  handler: (values: string[], options: TOptions) => Promise<void>;
}
