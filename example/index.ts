import { createCli } from "..";
import { Echo } from "./commands/echo";
import { Logger } from "./services/Logger";

const cli = createCli({
  commands: [new Echo(new Logger())],
});

cli.start(process.argv).catch(() => process.exit(1));
