import { createCli } from "..";
import { createEchoCommand } from "./commands/echo";
import { createLogger } from "./services/Logger";

const cli = createCli({
  commands: [createEchoCommand(createLogger())],
});

cli.start(process.argv).catch(() => process.exit(1));
