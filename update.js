'use scrict'
const { dialog, shell } = require('electron')

let localVersion, remoteVersion

function getLocalVersion () {
  const packageJson = require('./package.json')
  const packageVersion = JSON.stringify(packageJson.version)
  localVersion = packageVersion.replace(/[".]+/g, '')
  console.log('DEBUG: local version = ' + localVersion)
  return packageJson
}

async function fetchRemoteVersion () {
  const fetch = require('node-fetch')
  fetch('https://api.github.com/repos/vjba/whatstron/releases/latest')
    .then(res => res.json())
    .then(json => saveRemoteVersion(JSON.stringify(json.tag_name)))
}

async function saveRemoteVersion (ver) {
  remoteVersion = await ver.replace(/[".]+/g, '').toString()
  await console.log('DEBUG: remote version = ' + remoteVersion)
  await compareVersions()
}

function compareVersions () {
  if (localVersion !== remoteVersion) {
    try {
      dialog.showMessageBox(dialogOptions, (reponse) => {
        if (reponse === 0) {
          shell.openExternal('https://github.com/vjba/whatstron/releases/latest')
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}

const dialogOptions = {
  buttons: ['Yes, please', 'Maybe later'],
  defaultId: 1,
  title: 'WhatsTron Update Manager',
  message: 'A new version is available!',
  detail: 'Would you like to open the downloads page?'
}

module.exports.getLocalVersion = getLocalVersion
module.exports.fetchRemoteVersion = fetchRemoteVersion
