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
// db는 array인데 at()은 몇번째 아이템인지 가져오는 것.
// -1로 되어있는 게 마지막 인덱스의 인덱스
// db가 텅 비어있으면 db.at(-1)은 undefined여서 에러가 난다. 그래서 안정성을 위해 물음표를 붙여주는 것.

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
// 여기서 하는건 main 통해서 가는거라서 내 콘솔...
// main은 일렉트론이라서 내 콘솔...
// console.log를 연결해놔서 렌더러에서 뜨는 콘솔을 서버로그에도 뜨도록 조작할 수 있다.

export { getAll, get, getList, post, update, remove }
