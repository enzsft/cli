import { createCli } from ".."; // ... from "@enzsft/cli"
import { createEchoCommand } from "./commands/echo";
import { createLogger } from "./services/Logger";

const cli = createCli({
  commands: [createEchoCommand(createLogger())],
  description: "Example CLI tool build with @enzsft/cli",
  name: "example",
});

cli.start(process.argv).catch(() => process.exit(1));
