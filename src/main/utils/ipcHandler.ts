import * as db from '../db'
import { DataType } from '../db/mock'

const setHandler = (ipcMain: Electron.IpcMain): void => {
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on('log', (_, ...args) => console.log(...args))

  // db control
  ipcMain.on('db-getAll', async (event) => {
    event.returnValue = await db.getAll()
  })
  ipcMain.on('db-getList', async (event, page: number, size: number) => {
    event.returnValue = await db.getList(page, size)
  })
  ipcMain.on('db-get', async (event, index: DataType['index']) => {
    event.returnValue = await db.get(index)
  })
  ipcMain.on('db-post', async (event, data: Omit<DataType, 'index'>) => {
    event.returnValue = await db.post(data)
  })
  ipcMain.on(
    'db-update',
    async (event, index: DataType['index'], data: Omit<DataType, 'index'>) => {
      event.returnValue = await db.update(index, data)
    }
  )
  ipcMain.on('db-remove', async (event, index: DataType['index']) => {
    event.returnValue = await db.remove(index)
  })
}

export { setHandler }
