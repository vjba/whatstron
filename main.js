'use strict'
const { app, BrowserWindow, Tray } = require('electron')
const { fetchRemoteVersion } = require('./update')
const URL = require('url').URL
const { contextMenu, trayIcon } = require('./tray')

// Some global vars
let mainWindow = null
let appTray = null
const appURL = 'https://web.whatsapp.com'
const instanceLock = app.requestSingleInstanceLock()

// Create the browser window.
function createWindow () {
  mainWindow = new BrowserWindow({
    show: false,
    title: 'WhatsTron',
    icon: trayIcon,
    width: 800,
    height: 600,
    center: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      enableRemoteModule: false
    }
  })

  // Prevent HTTP document title from changing the window title
  mainWindow.on('page-title-updated', (event) => {
    event.preventDefault()
  })

  // Open OS default browser on external links
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    require('electron').shell.openExternal(url)
  })

  // Change HTTP user-agent
  mainWindow.webContents.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36')

  // Click close minimizes window
  mainWindow.on('close', (event) => {
    if (mainWindow.isVisible()) {
      event.preventDefault()
      mainWindow.minimize()
    }
  })

  // appTray configuration
  appTray = new Tray(trayIcon)
  appTray.setTitle('WhatsTron')
  appTray.setToolTip('WhatsTron')
  appTray.setContextMenu(contextMenu)

  // Load url
  mainWindow.loadURL(appURL)

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

// Prevent multiple instances of the app
if (!instanceLock) {
  app.quit()
} else {
  app.on('second-instance', (event) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.show()
      mainWindow.focus()
    }
  })
}

// Disable navigation outside of appURL
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== this.appURL) {
      event.preventDefault()
    }
  })
})

app.on('ready', createWindow)

// Check for update
app.on('ready', fetchRemoteVersion)

module.exports.app = app
module.exports.BrowserWindow = BrowserWindow
module.exports.mainWindow = mainWindow
