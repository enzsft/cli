#!/bin/sh

yarn build
yarn lint
yarn test --coverage
