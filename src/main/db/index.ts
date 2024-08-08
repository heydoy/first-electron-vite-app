import db, { dataType } from './mock'
import { delay } from './utils'

const getAll = async () => {
  await delay()
  return db.map((it) => ({ ...it }))
}
const get = async (index: dataType['index']) => {
  await delay()
  return db.find((data) => data.index === index)
}
const post = async (data: Omit<dataType, 'index'>) => {
  await delay()
  const index = db.at(-1)?.index ?? 0
  db.push({ ...data, index })
  return true
}
const update = async (index: dataType['index'], data: Omit<dataType, 'index'>) => {
  await delay()
  const origin = db.find((it) => it.index === index)
  if (origin === undefined) {
    console.error('not found data. index:', index)
    return false
  }
  Object.entries(data).forEach(([key, value]) => {
    origin[key] = value
  })
  return true
}
const remove = async (index: dataType['index']) => {
  await delay()
  const dbIndex = db.findIndex((data) => data.index === index)
  if (dbIndex === -1) {
    console.error('not found data. index:', index)
    return false
  }
  const removeData = db.splice(dbIndex, 1)
  console.log('remove data:', removeData)
  return true
}

export { getAll, get, post, update, remove }
