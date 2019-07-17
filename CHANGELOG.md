# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

![GitHub release](https://img.shields.io/github/release/vjba/whatstron.svg)
![GitHub Release Date](https://img.shields.io/github/release-date/vjba/whatstron.svg)

## [Unreleased]

## [1.2.0] - XXXX-XX-XX

### Changed

- Electron version ^4.0.0 to ^5.0.0

## [1.1.0] - XXXX-XX-XX

### Added

- Snapcraft build integration
- Publish script for Snapcraft
- Builds for `.rpm`, `.freebsd`, and `.snap`
- Icons for tray menu items
- Tray 'help' submenu and items:
  - Delete app data
  - Restart app
  - Report new issue to GitHub
- GitHub Pages
- Tested platforms stated in README.md
- Lint command `yarn` / `npm` `lint`
- Basic test suite with Mocha and Istanbul
- Codecov integration

### Security

- Updated dependencies
- Defined CSP HTTP Header
- Restricted navigation
- Disabled `remote` module

## [1.0.1] - 2019-07-10

### Added

- StandardJS linting
- Travis-CI integration
- Releases section to README.md

### Fixed

- Second instance detection ([issue #1](https://github.com/vjba/whatstron/issues/1))

## [1.0.0] - 2019-07-10

### Added

- Initial release
