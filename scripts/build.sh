#!/bin/sh

set -e

# Clean old build
rm -rf .build

# Build code
babel src --out-dir .build/src --extensions ".ts" --ignore "**/*.test.ts"
babel index.ts --out-file .build/index.js
babel test-utils.ts --out-file .build/test-utils.js

# Output type declarations
tsc

# Copy files
cp README.md .build/README.md
cp package.json .build/package.json
