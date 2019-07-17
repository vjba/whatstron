'use strict'
// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray, shell } = require('electron')
const { openUrlMenuItem } = require('electron-util')
const path = require('path')
const URL = require('url').URL

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null
let appIcon = null
const appURL = 'https://web.whatsapp.com'
const instanceLock = app.requestSingleInstanceLock()

// Set icons
let trayIcon, exitIcon, helpIcon, newIssueIcon, issuesIcon, deleteDataIcon, restoreIcon, websiteIcon, restartIcon
trayIcon = path.join(__dirname, 'assets', 'icon.png')
exitIcon = path.join(__dirname, 'assets', 'power_settings_new.png')
helpIcon = path.join(__dirname, 'assets', 'help.png')
newIssueIcon = path.join(__dirname, 'assets', 'add_alert.png')
issuesIcon = path.join(__dirname, 'assets', 'bug_report.png')
deleteDataIcon = path.join(__dirname, 'assets', 'delete.png')
restoreIcon = path.join(__dirname, 'assets', 'desktop_windows.png')
websiteIcon = path.join(__dirname, 'assets', 'link.png')
restartIcon = path.join(__dirname, 'assets', 'refresh.png')

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
      nodeIntegrationInWorker: false,
      enableRemoteModule: false
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
          label: 'View Issues',
          icon: issuesIcon,
          url: 'https://github.com/vjba/whatstron/issues'
        }),
        openUrlMenuItem({
          label: 'Report Issue',
          icon: newIssueIcon,
          url: 'https://github.com/vjba/whatstron/issues/new'
        }),
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
