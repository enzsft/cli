import parseArgsStringToArgv from "string-argv";

/**
 * Build a mock argv array for a given command
 *
 * @param {string} command The commmand name
 * @returns {string[]} Argv strings
 */
export const buildArgv = (command: string): string[] =>
  parseArgsStringToArgv(command, "node", "index.js");
