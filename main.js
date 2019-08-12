'use strict'
// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray, shell } = require('electron')
const { openUrlMenuItem } = require('electron-util')
const path = require('path')
const URL = require('url').URL

// Some global vars
let mainWindow = null
let appIcon = null
const appURL = 'https://web.whatsapp.com'
const instanceLock = app.requestSingleInstanceLock()

// Set icons
const trayIcon = path.join(__dirname, 'assets', 'icon.png')
const exitIcon = path.join(__dirname, 'assets', 'power_settings_new.png')
const helpIcon = path.join(__dirname, 'assets', 'help.png')
const newIssueIcon = path.join(__dirname, 'assets', 'add_alert.png')
const issuesIcon = path.join(__dirname, 'assets', 'bug_report.png')
const deleteDataIcon = path.join(__dirname, 'assets', 'delete.png')
const restoreIcon = path.join(__dirname, 'assets', 'desktop_windows.png')
const websiteIcon = path.join(__dirname, 'assets', 'link.png')
const restartIcon = path.join(__dirname, 'assets', 'refresh.png')

// fetch version from package.json
function getVersion () {
  const packageJson = require('./package.json')
  const json = JSON.stringify(packageJson.version)
  const version = json.replace(/["]+/g, '')
  return version
}

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

  // Open default browser on external links
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    require('electron').shell.openExternal(url)
  })

  // Change User-Agent to circumvent 'WhatsApp works with Google Chrome 49+' alert on startup
  // TODO Introduce array and randomizer for multiple agents
  mainWindow.webContents.setUserAgent('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0.0')

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
      icon: restoreIcon,
      click: () => {
        mainWindow.show()
      }
    },
    openUrlMenuItem({
      label: 'Visit Website',
      icon: websiteIcon,
      url: 'https://github.com/vjba/whatstron'
    }),
    {
      label: 'Help',
      icon: helpIcon,
      submenu: [
        openUrlMenuItem({
          label: 'Report Issue',
          icon: newIssueIcon,
          url: 'https://github.com/vjba/whatstron/issues/new/choose'
        }),
        openUrlMenuItem({
          label: 'View Issues',
          icon: issuesIcon,
          url: 'https://github.com/vjba/whatstron/issues'
        }),
        {
          label: '',
          type: 'separator'
        },
        {
          label: 'Delete App Data',
          icon: deleteDataIcon,
          click () {
            shell.moveItemToTrash(app.getPath('userData'))
            app.relaunch()
            process.exit(0)
          }
        },
        {
          label: 'Restart App',
          icon: restartIcon,
          click () {
            app.relaunch()
            process.exit(0)
          }
        },
        {
          label: '',
          type: 'separator'
        },
        {
          label: 'WhatsTron ' + getVersion(),
          enabled: false
        }
      ]
    },
    {
      label: '',
      type: 'separator'
    },
    {
      label: 'Exit',
      icon: exitIcon,
      click: () => {
        process.exit(0)
      }
    }
  ])

  // Load url
  mainWindow.loadURL(appURL)

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

// Disable navigation outside of appURL
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== this.appURL) {
      event.preventDefault()
    }
  })
})

// This method will be called when Electron has finished
// initialization (all of the above) and is ready to create browser window
app.on('ready', createWindow)

// TODO
// https://electronjs.org/docs/api/net
// https://www.christianengvall.se/electron-show-messagebox/
// https://api.github.com/repos/vjba/whatstron/releases
