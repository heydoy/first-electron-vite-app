import list, { ListDataType } from '../../api/list'
import Button from '../../components/token/Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const List = (): JSX.Element => {
  const [index] = useState(0)

  const allData = useQuery({
    queryKey: ['get-all'],
    queryFn: () => list.getAll(),
    refetchInterval: 5 * 1000,
    initialData: []
  })
  const data = useQuery({
    queryKey: ['get', index],
    queryFn: () => list.get(index),
    refetchInterval: 5 * 1000,
    initialData: null
  })
  const post = useMutation({
    mutationFn: async (data: Omit<ListDataType, 'index'>) => list.post(data),
    onSuccess: (result) => console.log('post result:', result)
  })
  const update = useMutation({
    mutationFn: async (data: ListDataType) => list.update(data.index, data),
    onSuccess: (result) => console.log('update result:', result)
  })
  const remove = useMutation({
    mutationFn: async (index: ListDataType['index']) => list.remove(index),
    onSuccess: (result) => console.log('remove result:', result)
  })

  const handleShowAllData = (): void => {
    if (allData.isFetching) {
      console.log('fetching...')
    }
    console.log(allData.data)
  }
  const handleShowData = (): void => {
    if (data.isFetching) {
      console.log('fetching...')
    }
    console.log(data.data)
  }
  const handlePostData = (): void => {
    const data: Omit<ListDataType, 'index'> = {
      title: '만들어진 제목',
      description: '만들어진 설명',
      link: '만들어진 link'
    }
    post.mutate(data)
  }
  const handleUpdateData = (): void => {
    const data: ListDataType = {
      index: 0,
      title: '수정된 제목',
      description: '수정된 설명',
      link: '수정된 link'
    }
    update.mutate(data)
  }
  const handleRemoveData = (): void => {
    remove.mutate(0)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      list page
      <Button onClick={handleShowAllData}>get all</Button>
      <Button onClick={handleShowData}>get</Button>
      <Button onClick={handlePostData}>post</Button>
      <Button onClick={handleUpdateData}>update</Button>
      <Button onClick={handleRemoveData}>remove</Button>
    </div>
  )
}

export default List
