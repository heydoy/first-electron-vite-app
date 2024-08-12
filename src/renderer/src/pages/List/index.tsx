import list, { ListDataType } from '../../api/list'
import Button from '../../components/token/Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import ListData from '../../components/feat/ListData'

const List = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 10

  const listData = useQuery({
    queryKey: ['get-list', currentPage],
    queryFn: () => list.getList(currentPage, PAGE_SIZE),
    refetchInterval: 5 * 1000,
    initialData: { data: [], currentPage, pageSize: PAGE_SIZE, totalPage: 0, hasNext: false }
  })
  const remove = useMutation({
    mutationFn: async (index: ListDataType['index']) => list.remove(index),
    onSuccess: (result) => {
      console.log('remove result:', result)
      listData.refetch()
    }
  })

  const makeHandleChangePage = (page: number) => (): void => {
    setCurrentPage(page)
  }

  const makeHandleRemoveData = (index: number) => (): void => {
    remove.mutate(index)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ul>
        {listData.data.data.map((it) => (
          <ListData key={it.index} data={it} onRemove={makeHandleRemoveData(it.index)} />
        ))}
      </ul>
      <ul style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        {Array.from({ length: listData.data.totalPage }, (_, index) => (
          <Button
            style={{
              fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
              textDecoration: currentPage === index + 1 ? 'underline' : 'none'
            }}
            key={index + 1}
            onClick={makeHandleChangePage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </ul>
    </div>
  )
}

export default List
