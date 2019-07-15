# WhatsTron

[![Maintenance](https://img.shields.io/maintenance/yes/2019.svg)](javascript:)
[![Code style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://standardjs.com/)
[![GitHub release](https://img.shields.io/github/release/vjba/whatstron.svg)](https://github.com/vjba/whatstron/releases/latest)
[![GitHub Release Date](https://img.shields.io/github/release-date/vjba/whatstron.svg)](javascript:)
[![GitHub issues](https://img.shields.io/github/issues/vjba/whatstron.svg)](https://github.com/vjba/whatstron/issues)
[![Master branch status](https://img.shields.io/travis/vjba/whatstron/master.svg?label=master)](https://travis-ci.org/vjba/whatstron/branches)
[![Develop branch status](https://img.shields.io/travis/vjba/whatstron/develop.svg?label=develop)](https://travis-ci.org/vjba/whatstron/branches)
[![GitHub](https://img.shields.io/github/license/vjba/whatstron.svg)](https://github.com/vjba/whatstron/blob/develop/LICENSE.md)

WhatsTron is a desktop WhatsApp client for Linux, built with Electron

## Features

* **Persistent login** as is the standard browser behaviour
* **Tray icon** for quick access to window restore, visiting this repo, and app exit
* **Super speedy load time** compared to firing up a browser, thanks to [Electron](https://electronjs.org)
* **Close to tray** so you don't accidentally close the app. Just click on the tray icon and then 'Restore Window'

## Installation

### Bundles (`.deb`, `AppImage`, `source` etc)

Please see the repository [Releases](https://github.com/vjba/whatstron/releases/latest) page for the latest downloads.

### yarn

Using the package manager [yarn](https://yarnpkg.com/en/docs/getting-started) to install WhatsTron, run:

```bash
git clone https://github.com/vjba/WhatsTron.git
cd whatstron
yarn
yarn start
```

### npm

Using the package manager [npm](https://www.npmjs.com/get-npm) to install WhatsTron, run:

```bash
git clone https://github.com/vjba/WhatsTron.git
cd whatstron
npm install
npm start
```

### Issue with `start`

When running `yarn start` or `npm start` you may encounter to follow error:

```bash
[1234:5678/123456.234567:FATAL:setuid_sandbox_host.cc(123)] The SUID sandbox helper binary was found, but is not configured correctly. Rather than run without sandboxing Im aborting now. You need to make sure that /home/user/whatstron/node_modules/electron/dist/chrome-sandbox is owned by root and has mode 4755.
```

To fix this error enter the following commands (***note***: _root privililedges required_)

```bash
# changes owner of chrome-sandbox to root
sudo chown root node_modules/electron/dist/chrome-sandbox
# changes permissions of chrome-sandbox to 4755 / -rwsr-xr-x
sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
```

## Usage

Using your preferred method of package manager:

```bash
yarn start  # run the electron app
yarn lint   # lints the code to conform with StandardJS
yarn pack   # generate an unpacked build to /dist/linux-unpacked
yarn dist   # builds packages for AppImage, deb, and tar.xz to /dist
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md)

## Changelog

Please read [CHANGELOG.md](./CHANGELOG.md)

## License

[MIT](./LICENSE.md)
