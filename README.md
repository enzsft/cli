<div align="center">
  <h1>@enzsft/cli</h1>
  <h1>😲</h1>
  <h3>Build multi command CLI tools with ease.</h3>
  <a href='https://travis-ci.org/enzsft/cli'>
    <img src="https://travis-ci.org/enzsft/cli.svg?branch=master" alt="Build Status" />
  </a>
  <a href='https://coveralls.io/github/enzsft/cli?branch=master'>
    <img src='https://coveralls.io/repos/github/enzsft/cli/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href="https://www.npmjs.com/package/@enzsft/cli">
    <img src="https://badge.fury.io/js/%40enzsft%2Fcli.svg" alt="npm version">
  </a>
  <img alt="undefined" src="https://img.shields.io/github/languages/top/enzsft/cli.svg?style=flat">
</div>
<hr />

Building multi command CLI tools should be easy. We've written **@enzsft/cli** to ensure you can get up and running writing one as quickly as possible. It handles executing commands, parsing options and validating options.

## Motivation 🧐

A pain building CLI tools with existing libraries has always been the inability to fully test the commands you configure as a user would use them.

So our biggest goal building this library was to provide a super easy way to test commands as a whole, not just the handler functions, and in a way that matches how a user would. We have a section on testing your commands in this README!

We also wanted to provide a codebase that leveraging modern JavaScript and provides simpler types than alternatives via TypeScript.

## Getting started 🏎

Getting up and running is fast! ⚡️

### 1. Install the package:

```bash
yarn add @enzsft/cli

# or

npm install @enzsft/cli
```

### 2. Create a new file and paste the following example:

```js
// index.js

import { createCli, createBooleanOption } from "@enzsft/cli";

const echoCommand = {
  name: "echo",
  description: "Echos back string values. Optionally capitalize them.",
  options: [
    createBooleanOption({
      name: "capitalize",
      altName: "c",
      description: "Capitalize all values.",
      required: false,
      defaultValue: false,
    }),
  ],
  handler: (values, options) => {
    for (const value of values) {
      console.log(options.capitalize ? value.toUpperCase() : value);
    }

    return Promise.resolve();
  },
};

const cli = createCli({
  name: "example",
  description: "Example CLI tool build with @enzsft/cli",
  commands: [echoCommand],
});

cli.start(process.argv).catch(() => process.exit(1));
```

### 3. Run the tool!

```bash
node index.js --help
#
# Echos back string values. Optionally capitalize them.
#
# Options:
#
#     --help, --h       Display tool help.
#     --version, --v    Display tool version.
#
# Usage: example [command] [options...]
#
# Commands:
#
#     echo    Echos back string values. Optionally capitalize them.
#
#             --capitalize, --c    Capitalize all values.

node index.js echo hello
# hello

node index.js echo --capitalize hello
# HELLO
```

## API 🌳

### Create a new CLI

```js
import { createCli } from "@enzsft/cli";

const cli = createCli({
  name: "", // Should match the executable name so `--help` docs are correct.
  description: "",
  commands: [],
});
```

### Start the CLI

```js
cli
  .start(process.argv) // Commands and options are parsed from `argv`
  .catch(() => process.exit(1)); // Prevent UnhandledPromiseRejection from node
```

### Creating commands

```js
const command = {
  name: "", // If 2 commands names match, the command registered first will win
  description: "",
  options: [],
  handler: (values, options) => Promise.resolve(), // Should always return a promise
};
```

### Creating options

```js
import {
  createBooleanOption,
  createNumberOption,
  createStringOption,
} from "@enzsft/cli";

const options = [
  createBooleanOption({
    name: "bool",
    altName: "b",
    description: "Some boolean option.",
    required: false,
    defaultValue: false,
  }),
  createNumberOption({
    name: "number",
    altName: "n",
    description: "Some number option.",
    required: false,
    defaultValue: 1,
  }),
  createStringOption({
    name: "string",
    altName: "b",
    description: "Some string option.",
    required: false,
    defaultValue: "hello world",
  }),
];
```

Options are parsed from `argv` and then injected into the executing command's handler function. When they are injected they are converted into the correct type.

## Built with TypeScript with 💖

[TypeScript](https://www.typescriptlang.org/) type definitions are bundled in with the module. No need to install an additional module for type definitions.

## Testing your commands 🧪

_All examples use [Jest](https://jestjs.io/)_ ✌️

This library was built with testing in mind. We believe in testing your commands as closely to how a user would use them as possible!

Take the following command:

```js
import { createBooleanOption } from "@enzsft/cli";

export const createEchoCommand = logger => ({
  name: "echo",
  description: "Echos back string values.",
  options: [
    createBooleanOption({
      name: "capitalize",
      altName: "c",
      description: "Capitalize all values.",
      required: false,
      defaultValue: false,
    }),
  ],
  handler: (values, options) => {
    for (const value of values) {
      logger.log(options.capitalize ? value.toUpperCase() : value);
    }

    return Promise.resolve();
  },
});
```

We want to ensure the commands options are wired up correctly when testing. This means we can't just run the handler in our tests and inject the options like:

```js
describe("BAD TESTS... In our opinion 😅", () => {
  it("should echo the values", async () => {
    const mockLogger = { log: jest.fn() };
    const command = createEchoCommand(mockLogger);

    const values = ["one", "two"];
    await command.handler(values, { capitalize: false });

    expect(mockLogger.log).toHaveBeenCalledTimes(2);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x);
    });
  });

  it("should echo the values capitalized", async () => {
    const mockLogger = { log: jest.fn() };
    const command = createEchoCommand(mockLogger);

    const values = ["one", "two"];
    await command.handler(values, { capitalize: true });

    expect(mockLogger.log).toHaveBeenCalledTimes(2);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x.toUpperCase());
    });
  });
});
```

Ok, so the above tests aren't "BAD TESTS"! They assert all the behaviour of the handler well enough. They'll even result in 100% test coverage! However... We injected a perfect options object each time. These tests would still pass if we changed the alternative name for the capitalize option from `"c"` to `"b"`.

In order to combat this we provide a simple test utility function, `buildArgv`. hat allows us to invoke the command closer to how a user does! With a command string!

```js
import { createCli } from "@enzsft/cli";
import { buildArgv } from "@enzsft/cli/test-utils";

describe("BETTER TESTS... In our opinion 😁", () => {
  it("should echo the values", async () => {
    const mockLogger = { log: jest.fn() };
    const command = createEchoCommand(mockLogger);
    const cli = createCli({ commands: [command], description, name });

    // Invoke the command via its name and
    // pass values like you would in the terminal
    const values = ["one", "two"];
    await cli.start(buildArgv(`echo ${values.join(" ")}`));

    expect(mockLogger.log).toHaveBeenCalledTimes(2);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x);
    });
  });

  it("should echo the values capitalized (name)", async () => {
    const mockLogger = { log: jest.fn() };
    const command = createEchoCommand(mockLogger);
    const cli = createCli({ commands: [command], description, name });

    // Yay we can pass the option in like a user would now!
    const values = ["one", "two"];
    await cli.start(buildArgv(`echo --capitalize ${values.join(" ")}`));

    expect(mockLogger.log).toHaveBeenCalledTimes(2);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x.toUpperCase());
    });
  });

  it("should echo the values capitalized (alternative name)", async () => {
    const mockLogger = { log: jest.fn() };
    const command = createEchoCommand(mockLogger);
    const cli = createCli({ commands: [command], description, name });

    // Yay we can pass the option in like a user would now!
    const values = ["one", "two"];
    await cli.start(buildArgv(`echo -c ${values.join(" ")}`));

    expect(mockLogger.log).toHaveBeenCalledTimes(2);
    values.forEach((x, i) => {
      expect(mockLogger.log).toHaveBeenNthCalledWith(i + 1, x.toUpperCase());
    });
  });
});
```

## Alternatives 😽

Our favourites are [Yargs](https://www.npmjs.com/package/yargs) and [Commander](https://www.npmjs.com/package/commander). They're awesome, check them out! This library was written mainly the solve the testing issue explained above.
