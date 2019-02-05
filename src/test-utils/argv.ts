import parseArgsStringToArgv from "string-argv";

/**
 * Build a mock argv array for a given command
 * @param command
 */
export const buildArgv = (command: string): string[] =>
  parseArgsStringToArgv(command, "node", "index.js");
