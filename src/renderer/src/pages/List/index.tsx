import list, { ListDataType } from '../../api/list'
import Button from '../../components/token/Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import ListCard from '@renderer/components/pure/ListCard'

// - JSX.Element 와 React.ReactNode
// 둘다 외부에서 주입받을 컴포넌트 타입을 정의할 때 가장 많이 사용한다.
// ReactNode는 ReactElement를 비롯하여 대부분의 자바스크립트 데이터타입을 아우르는 범용적인 타입이다.
// 어떤 타입이 올지 알 수 없거나, 혹은 어떤 타입도 모두 받고 싶다면 ReactNode로 지정해주는 것이 좋다.
// JSX.Element는 ReactElement의 타입과 props를 모두 any로 받아 확장한 인터페이스로 더 범용적으로 사용할 수 있다.
// React 관련 타입은 모두 React의 네임스페이스에 선언되어있다.
// JSX는 전역 네임스페이스로 선언되어 있다. 따라서 React 내에서 JSX를 import하지 않아도 바로 사용이 가능하다.
// 참고: https://www.howdy-mj.me/react/react-node-and-jsx-element

const List = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 10

  const listData = useQuery({
    queryKey: ['get-list', currentPage],
    queryFn: () => list.getList(currentPage, PAGE_SIZE),
    refetchInterval: 5 * 1000,
    staleTime: Infinity,
    initialData: { data: [], currentPage, pageSize: PAGE_SIZE, totalPage: 0, hasNext: false }
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
    onSuccess: (result) => {
      console.log('remove result:', result)
      listData.refetch()
    }
  })

  const makeHandleChangePage = (page: number) => (): void => {
    setCurrentPage(page)
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

  const makeHandleRemoveData = (index: number) => (): void => {
    remove.mutate(index)
  }

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        overflowY: 'scroll',
        alignItems: 'center'
      }}
    >
      <h1>List Page</h1>
      <ul style={{ display: 'flex', height: 'fit-content', flexDirection: 'column', gap: '24px' }}>
        {listData.data.data.map((it) => (
          <ListCard
            key={it.index}
            index={it.index}
            title={it.title}
            description={it.description}
            link={it.link}
            removeHandler={makeHandleRemoveData(it.index)}
          />
        ))}
      </ul>
      <ul style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
        {Array.from({ length: listData.data.totalPage }, (_, index) => (
          <Button
            style={{
              fontWeight: currentPage === index + 1 ? 'bolder' : 'normal',
              textDecoration: currentPage === index + 1 ? 'underline' : 'none'
            }}
            key={index + 1}
            onClick={makeHandleChangePage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </ul>
      <Button onClick={handleUpdateData}> Update Data</Button>
      <Button onClick={handlePostData}> Post Data </Button>
    </div>
  )
}

export default List

// - useQuery, useMutation
// useQuery
// const { isLoading, error, data } = useQuery('user', fetcher, option)
// Server state를 읽어오는 hook
// 첫번째 반환값을 이용하여 성공, 실패 처리 가능 (isFetching, isLoading, error, state)
// useQuery의 첫번째 인자인 QueryKey에 따라서 캐싱 처리
// 캐싱된 쿼리의 QueryKey와 동일한 요청을 하는 쿼리는 같은 것으로 인식하여 fetch하지 않고 캐싱된 쿼리 그대로 사용.
// 쿼리키는 유니크한 값이면 된다. array 는 순서가 서로 바뀌어도 unique, object는 순서가 바뀌면 같은 값으로 인식
// 두번째 인자 fetcher는 Promise를 반환하는 함수여야한다.
// 세번째 인자 options에는 캐시 만료시점, refetch시점, 초기값등을 설정할 수 있으며 생략 가능하다.

// useMutation
// const { mutate } = useMutation(mutationFn, {options ...})
// mutate(variables, {onSuccess, onSettled, onError})
// Server State를 변경시키는 hook (create, update, delete)
// return 값 중 mutate는 mutationFn을 trigger하는 ㅎ마수
// 객체로 받은 variables를 mutationFn에 넘겨준다.
