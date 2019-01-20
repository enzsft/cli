import { Cli } from "..";
import { Echo } from "./commands/echo";
import { Logger } from "./services/Logger";

const cli = new Cli({
  commands: [new Echo(new Logger())],
});

cli.start(process.argv).catch(() => process.exit(1));
