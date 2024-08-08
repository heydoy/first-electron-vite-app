// const { app } = require('electron')

import { IpcMain } from 'electron'

function ipcHandler(ipcMain: IpcMain): void {
  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on('log', (_, ...args) => console.log(...args))
}

export default ipcHandler
