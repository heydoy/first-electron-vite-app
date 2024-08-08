// const { app } = require('electron')

import { IpcMain } from 'electron'
import * as db from '../db'
import { DataType } from '../db/mock'

function ipcHandler(ipcMain: IpcMain): void {
  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on('log', (_, ...args) => console.log(...args))

  //DB
  ipcMain.on('db-get-all', async (event) => {
    event.returnValue = await db.getAll()
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

export default ipcHandler

// - Omit<Type, Keys> 유틸리티 타입, 제네릭 타입
// type NewType = Omit<OriginalType, 'Key1' | 'Key2'>
// 여기서 OriginalType은 생성하고 싶은 새 타입의 원형
// Key1, Key2 는 새 타입에서 지우고 싶은 프로퍼티
//
// Partial<OriginalType>
// 파셜 타입은 특정타입의 부분집합을 만족하는 타입을 정의할 수 있다.
// 인자에 OriginalType을 넣으면 모든 정보를 다 넣어야한다.
//
// Pick<OriginalType, 'Key1' | 'Key2'>
// Key1, Key2 의 일부만 사용. 또는 별도의 속성이 추가되는 경우가 있음.
// 인터페이스의 모양이 다랄질 수 있다.
// 픽 타입은 특정타입에서 몇개 속성을 선택하여 타입을 정의한다.
// 참고: https://www.geeksforgeeks.org/typescript-omittype-keys-utility-type/
// 참고: https://kyounghwan01.github.io/blog/TS/fundamentals/utility-types/#partial
