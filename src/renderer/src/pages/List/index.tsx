import list, { ListDataType } from '../../api/list'
import Button from '../../components/token/Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

// - JSX.Element 와 React.ReactNode
// 둘다 외부에서 주입받을 컴포넌트 타입을 정의할 때 가장 많이 사용한다.
// ReactNode는 ReactElement를 비롯하여 대부분의 자바스크립트 데이터타입을 아우르는 범용적인 타입이다.
// 어떤 타입이 올지 알 수 없거나, 혹은 어떤 타입도 모두 받고 싶다면 ReactNode로 지정해주는 것이 좋다.
// JSX.Element는 ReactElement의 타입과 props를 모두 any로 받아 확장한 인터페이스로 더 범용적으로 사용할 수 있다.
// React 관련 타입은 모두 React의 네임스페이스에 선언되어있다.
// JSX는 전역 네임스페이스로 선언되어 있다. 따라서 React 내에서 JSX를 import하지 않아도 바로 사용이 가능하다.
// 참고: https://www.howdy-mj.me/react/react-node-and-jsx-element

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
    onSuccess: (result) => console.log('post result: ', result)
  })

  const update = useMutation({
    mutationFn: async (data: ListDataType) => list.update(data.index, data),
    onSuccess: (result) => console.log('update result: ', result)
  })

  const remove = useMutation({
    mutationFn: async (index: ListDataType['index']) => list.remove(index),
    onSuccess: (result) => console.log('remove result: ', result)
  })

  const handleShowAllData = (): void => {
    if (data.isFetching) {
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
      title: 'Posted Title',
      description: 'Posted description',
      link: 'https://posted.link'
    }
    post.mutate(data)
  }

  const handleUpdateData = (): void => {
    const data: ListDataType = {
      index: 0,
      title: 'Edited Title',
      description: 'Edited description',
      link: 'https://edited.link'
    }
    update.mutate(data)
  }

  const handleRemoveData = (): void => {
    remove.mutate(0)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>List Page</h1>
      <Button onClick={handleShowAllData}> Get All Data </Button>
      <Button onClick={handleShowData}> Get Data </Button>
      <Button onClick={handleUpdateData}> Update Data</Button>
      <Button onClick={handlePostData}> Post Data </Button>
      <Button onClick={handleRemoveData}> Remove Data </Button>
    </div>
  )
}

export default List
