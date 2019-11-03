'use strict'
const { app, BrowserWindow, Tray, Menu, shell } = require('electron')
const { openUrlMenuItem } = require('electron-util')
const path = require('path')
const URL = require('url').URL
const { checkUpdate, getLocalVersion } = require('./update')

// Some global vars
let mainWindow = null
let appTray = null
const appURL = 'https://web.whatsapp.com'
const instanceLock = app.requestSingleInstanceLock()

// Icon resources
const trayIcon = path.join(__dirname, 'assets', 'icon.png')
const exitIcon = path.join(__dirname, 'assets', 'power_settings_new.png')
const helpIcon = path.join(__dirname, 'assets', 'help.png')
const newIssueIcon = path.join(__dirname, 'assets', 'add_alert.png')
const issuesIcon = path.join(__dirname, 'assets', 'bug_report.png')
const deleteDataIcon = path.join(__dirname, 'assets', 'delete.png')
const restoreIcon = path.join(__dirname, 'assets', 'desktop_windows.png')
const websiteIcon = path.join(__dirname, 'assets', 'link.png')
const restartIcon = path.join(__dirname, 'assets', 'refresh.png')

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
    label: '',
    type: 'separator'
  },
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
        label: 'WhatsTron ' + getLocalVersion(),
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
    checkUpdate()
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
