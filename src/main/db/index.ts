import db, { DataType } from './mock'
import { delay, Pagination } from './utils'

const getAll = async (): Promise<DataType[]> => {
  await delay()
  return db.map((it) => ({ ...it }))
}
const get = async (index: DataType['index']): Promise<DataType | void> => {
  await delay()
  return db.find((data) => data.index === index)
}
const getList = async (page: number, size: number): Promise<Pagination<DataType>> => {
  await delay()
  const totalPage = Math.ceil(db.length / size)
  const startIndex = size * (page - 1)
  const data = db.slice(startIndex, startIndex + size)
  return {
    data,
    totalPage,
    currentPage: page,
    pageSize: size,
    hasNext: db[startIndex + size] !== undefined
  }
}
const post = async (data: Omit<DataType, 'index'>): Promise<boolean> => {
  await delay()
  const index = (db.at(-1)?.index ?? -1) + 1
  db.push({ ...data, index })
  return true
}
const update = async (
  index: DataType['index'],
  data: Omit<DataType, 'index'>
): Promise<boolean> => {
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
const remove = async (index: DataType['index']): Promise<boolean> => {
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

export { getAll, get, getList, post, update, remove }
