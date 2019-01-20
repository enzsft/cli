import { Cli } from "../src";
import { Echo } from "./commands/echo";

const cli = new Cli({
  commands: [new Echo()],
});

cli.start(process.argv);
