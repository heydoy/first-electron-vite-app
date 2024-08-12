const delay = (time = 500): Promise<void> =>
  new Promise<void>((r) => {
    setTimeout(() => r(), time)
  })

export type Pagination<D> = {
  currentPage: number
  data: D[]
  hasNext: boolean
  totalPage: number
  pageSize: number
}

export { delay }
