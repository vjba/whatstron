'use strict'
const path = require('path')
const { Menu, shell } = require('electron')
const { openUrlMenuItem } = require('electron-util')
const { getLocalVersion } = require('./update')
const { mainWindow, app } = require('./main')

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

module.exports.contextMenu = contextMenu
module.exports.trayIcon = trayIcon
