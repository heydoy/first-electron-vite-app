export type ListDataType = {
  index: number
  title: string
  description: string
  link: string
}

const list = {
  getAll: async (): Promise<ListDataType[]> => window.electron.ipcRenderer.sendSync('db-get-all'),
  get: async (index: ListDataType['index']): Promise<ListDataType> =>
    window.electron.ipcRenderer.sendSync('db-get', index),
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
