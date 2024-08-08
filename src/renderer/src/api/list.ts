export type listDataType = {
  index: number
  title: string
  description: string
  link: string
}

const list = {
  getAll: async (): Promise<listDataType[]> => window.electron.ipcRenderer.sendSync('db-getAll'),
  get: async (index: listDataType['index']): Promise<listDataType> =>
    window.electron.ipcRenderer.sendSync('db-get', index),
  post: async (data: Omit<listDataType, 'index'>): Promise<boolean> =>
    window.electron.ipcRenderer.sendSync('db-post', data),
  update: async (
    index: listDataType['index'],
    data: Omit<listDataType, 'index'>
  ): Promise<boolean> => window.electron.ipcRenderer.sendSync('db-update', index, data),
  remove: async (index: listDataType['index']): Promise<boolean> =>
    window.electron.ipcRenderer.sendSync('db-remove', index)
}

export default list
