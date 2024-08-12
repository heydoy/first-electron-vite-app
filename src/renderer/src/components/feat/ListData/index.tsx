import { ListDataType } from '@renderer/api/list'
import Button from '../../token/Button'

type ListDataPropsType = {
  data: ListDataType;
  onRemove: () => void;
}

const ListData = (props: ListDataPropsType): JSX.Element => {
  const { data, onRemove } = props

  return (
    <li style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
      <span style={{ width: '50px' }}>{data.index}</span>
      <span style={{ width: '200px', overflow: 'hidden' }} title={data.link}>
        {data.title}
      </span>
      <span style={{ width: '200px', overflow: 'hidden' }}>{data.description}</span>
      <Button style={{ color: 'skyblue' }} onClick={onRemove}>
        remove
      </Button>
    </li>
  )
}

export default ListData
