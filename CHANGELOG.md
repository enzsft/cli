# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.1/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.2] - 2019-03-03

### Fixed

- Building runtime in to async works without regeneratorRuntime

## [2.0.1] - 2019-03-03

### Fixed

- Added missing type def files

## [2.0.0] - 2019-03-03

### Fixed

- Moved to babel compilation from TSC ([Issue #5](https://github.com/enzsft/cli/issues/5))
- Renamed interfaces to not use the convention of starting with 'I'
- Moved from TSLint to ESLint ([Issue #6](https://github.com/enzsft/cli/issues/6))

## [1.0.7] - 2019-02-19

### Fixed

- Switched from coveralls to codecov for coverage support ([Issue #2](https://github.com/enzsft/cli/issues/2))

## [1.0.6] - 2019-02-10

### Fixed

- Updated Readme to include version config

## [1.0.5] - 2019-02-10

### Fixed

- added `version` to ICliConfig ([Issue #1](https://github.com/enzsft/cli/issues/1))

## [1.0.4] - 2019-02-10

### Fixed

- Fixed mistake when fixing ([Issue #1](https://github.com/enzsft/cli/issues/1))

## [1.0.3] - 2019-02-10

### Fixed

- Loading version number from package.json instead of npm env var ([Issue #1](https://github.com/enzsft/cli/issues/1))

## [1.0.2] - 2019-01-30

### Fixed

- Typos in README and CHANGELOG

## [1.0.1] - 2019-01-30

### Added

- Motivation statement to README
- More badges to README
- Added JSDocs

## [1.0.0] - 2019-01-29

### Added

- CI
- Example tool
- Initial implementation of:
  - createCli(...)
  - createBooleanOption(...)
  - createNumberOption(...)
  - createStringOption(...)
  - buildArgv(...)
- Setup repo
