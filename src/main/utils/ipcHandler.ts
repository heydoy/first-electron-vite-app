import * as db from '../db'
import { dataType } from '../db/mock'

const setHandler = (ipcMain: Electron.IpcMain): void => {
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on('log', (_, ...args) => console.log(...args))

  // db control
  ipcMain.on('db-getAll', async (event) => {
    event.returnValue = await db.getAll()
  })
  ipcMain.on('db-get', async (event, index: dataType['index']) => {
    event.returnValue = await db.get(index)
  })
  ipcMain.on('db-post', async (event, data: Omit<dataType, 'index'>) => {
    event.returnValue = await db.post(data)
  })
  ipcMain.on(
    'db-update',
    async (event, index: dataType['index'], data: Omit<dataType, 'index'>) => {
      event.returnValue = await db.update(index, data)
    }
  )
  ipcMain.on('db-remove', async (event, index: dataType['index']) => {
    event.returnValue = await db.remove(index)
  })
}

export { setHandler }
