#!/bin/sh

rm -rf .build
tsc
cp README.md .build/README.md
cp package.json .build/package.json
