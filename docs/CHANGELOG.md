---
layout: default
title: Changelog
nav_order: 2
---

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

![GitHub release](https://img.shields.io/github/release/vjba/whatstron.svg)
![GitHub Release Date](https://img.shields.io/github/release-date/vjba/whatstron.svg)

## [1.3.2] - 2019-08-27

### Security

- Bump deps ([issue #13](https://github.com/vjba/whatstron/issues/13))

## [1.3.1] - 2019-08-19

### Fixed

- Build packages
- .md permalinks

## [1.3.0] - 2019-08-18

### Added

- Update alert on new version
- Window now minimizes on close instead of hiding
- Automated version detection

### Changed

- Upgraded from Electron 4.x.y to 6.x.y
- Cleared up comments

## [1.2.0] - 2019-08-12

### Added

- Links now open in OS default browser ([issue #7](https://github.com/vjba/whatstron/issues/7))
- Codacy integration
- README.md shields
- README.md screenshot

### Changed

- 'Report Issue' now links to template selection
- Moved menu items order

## [1.1.2] - 2019-08-09

### Added

- ESLint dependency and config (still Standard)
- App version to tray menu

### Fixed

- Icon issue between dark and light OS themes ([issue #5](https://github.com/vjba/whatstron/issues/5))

## [1.1.0] - 2019-07-20

### Added

- Automated build publishing
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
