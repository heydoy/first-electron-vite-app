import list, { listDataType } from '../../api/list'
import Button from '../../components/token/Button'

const List = (): JSX.Element => {
  const getAllData = async (): Promise<void> => {
    const data = await list.getAll()
    console.log({ data })
  }
  const getData = async (): Promise<void> => {
    const data = await list.get(0)
    console.log({ data })
  }
  const postData = async (): Promise<void> => {
    const data: Omit<listDataType, 'index'> = {
      title: '만들어진 제목',
      description: '만들어진 설명',
      link: '만들어진 link'
    }
    const result = await list.post(data)
    console.log({ result })
  }
  const updateData = async (): Promise<void> => {
    const data: Omit<listDataType, 'index'> = {
      title: '수정된 제목',
      description: '수정된 설명',
      link: '수정된 link'
    }
    const result = await list.update(0, data)
    console.log({ result })
  }
  const removeData = async (): Promise<void> => {
    const result = await list.remove(0)
    console.log({ result })
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      list page
      <Button onClick={getAllData}>get all</Button>
      <Button onClick={getData}>get</Button>
      <Button onClick={postData}>post</Button>
      <Button onClick={updateData}>update</Button>
      <Button onClick={removeData}>remove</Button>
    </div>
  )
}

export default List
