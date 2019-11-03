const { dialog, shell } = require('electron')
const axios = require('axios')

function getLocalVersion () {
  try {
    const packageJson = require('./package.json')
    return JSON.stringify(packageJson.version).replace(/["]+/g, '')
  } catch (error) {
    console.debug(error)
  }
}

function getRemoteVersion () {
  try {
    const remoteVersion = axios.get('https://api.github.com/repos/vjba/whatstron/releases/latest').then(res => res.data.tag_name)
    return remoteVersion
  } catch (error) {
    console.error(error)
  }
}

async function checkUpdate () {
  const localVersion = getLocalVersion()
  const remoteVersion = await getRemoteVersion()

  if (localVersion !== remoteVersion) {
    console.info('Local version: ' + localVersion + '\nRemote version: ' + remoteVersion)
    dialog.showMessageBoxSync(null, dialogOptions, (response) => {
      if (response === 0) {
        shell.openExternal('https://github.com/vjba/whatstron/releases/latest')
        shell.openItem('http://google.com')
      }
    })
  }
}

const dialogOptions = {
  buttons: ['Yes, please', 'No, thanks'],
  defaultId: 1,
  title: 'WhatsTron Updater',
  message: 'A new version is available!',
  detail: 'Would you like to open the downloads page?',
  focus: true
}

module.exports.getLocalVersion = getLocalVersion
module.exports.checkUpdate = checkUpdate
