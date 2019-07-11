'use strict'
// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray } = require('electron')
const { openUrlMenuItem } = require('electron-util')
const { platform } = require('os')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null
let trayIcon = null
let appIcon = null
const URL = 'https://web.whatsapp.com'
const instanceLock = app.requestSingleInstanceLock()

// Set tray icon image
trayIcon = path.join(__dirname, 'assets', 'icon.png')

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    title: 'WhatsTron',
    icon: trayIcon,
    width: 800,
    height: 600,
    center: true,
    darkTheme: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: false
    }
  })

  // Prevent HTTP document title from changing the window title
  mainWindow.on('page-title-updated', (event) => {
    event.preventDefault()
  })

  // Change User-Agent to circumvent 'WhatsApp works with Google Chrome 49+' alert on startup
  // TODO Introduce array and randomizer for multiple agents
  mainWindow.webContents.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.90 Safari/537.36')

  // Click close hides window
  mainWindow.on('close', (event) => {
    if (mainWindow.isVisible()) {
      event.preventDefault()
      mainWindow.hide()
    }
  })

  // Create tray icon
  appIcon = new Tray(trayIcon)

  // Set title for tray icon
  appIcon.setTitle('WhatsTron')

  // Set tool tip for tray icon
  appIcon.setToolTip('WhatsTron')

  // Create context menu for tray icon
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Restore Window',
      click: () => {
        mainWindow.show()
      }
    },
    openUrlMenuItem({
      label: 'Visit GitHub Repository',
      url: 'https://github.com/vjba/whatstron'
    }),
    {
      label: '',
      type: 'separator'
    },
    {
      label: 'Exit',
      click: () => {
        app.quit()
      }
    }
  ])

  // Load url
  mainWindow.loadURL(URL)

  // Add above context menu to tray
  appIcon.setContextMenu(contextMenu)

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

// This method will be called when Electron has finished
// initialization (all of the above) and is ready to create browser window
app.on('ready', createWindow)
