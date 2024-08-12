export type ListDataType = {
  index: number
  title: string
  description: string
  link: string
}

export type Pagination<D> = {
  currentPage: number
  data: D[]
  hasNext: boolean
  totalPage: number
  pageSize: number
}

const list = {
  getAll: async (): Promise<ListDataType[]> => window.electron.ipcRenderer.sendSync('db-getAll'),
  get: async (index: ListDataType['index']): Promise<ListDataType> =>
    window.electron.ipcRenderer.sendSync('db-get', index),
  getList: async (page: number, size: number): Promise<Pagination<ListDataType>> =>
    window.electron.ipcRenderer.sendSync('db-getList', page, size),
  post: async (data: Omit<ListDataType, 'index'>): Promise<boolean> =>
    window.electron.ipcRenderer.sendSync('db-post', data),
  update: async (
    index: ListDataType['index'],
    data: Omit<ListDataType, 'index'>
  ): Promise<boolean> => window.electron.ipcRenderer.sendSync('db-update', index, data),
  remove: async (index: ListDataType['index']): Promise<boolean> =>
    window.electron.ipcRenderer.sendSync('db-remove', index)
}

export default list
