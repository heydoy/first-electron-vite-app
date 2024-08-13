import styled from 'styled-components'
import { ListDataType } from '@renderer/api/list'
import { useState } from 'react'

const StyledListForm = styled.form`
  all: unset;
  display: flex;
  flex-direction: column;
  padding: 8px;
  & > .index,
  .title,
  .description,
  .link {
    font-size: 13px;
    color: 'white';
    width: '60px';
    margin-bottom: '4px';
  }
  & > button {
    background: 'orange';
    font-size: '15px';
    padding: '12px';
    margin-top: '18px';
    width: '140px';
    height: '68px';
  }
`
type ListFormProps = Omit<ListDataType, 'index'>

const ListForm = (props: {
  formData: ListFormProps
  index: number
  isEdit: boolean
}): JSX.Element => {
  const propData: Omit<ListDataType, 'index'> = props.isEdit
    ? props.formData
    : { title: '', description: '', link: '' }

  const [index] = useState(props.index)
  const [data, setData] = useState(propData)

  const handleUpdate = (): void => {
    console.log(data)
  }

  return (
    <StyledListForm>
      <label className="index">Index</label>
      <input type="number" value={index} readOnly />

      <label className="title">Title</label>
      <input
        type="text"
        name="title"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <label className="description">Description</label>
      <input
        type="text"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />

      <label className="url">URL</label>
      <input
        type="text"
        name="link"
        value={data.link}
        onChange={(e) => setData({ ...data, link: e.target.value })}
      />
      <button
        type="submit"
        onClick={(e) => {
          handleUpdate()
          e.preventDefault()
        }}
      >
        {props.isEdit ? '수정' : '추가'}
      </button>
    </StyledListForm>
  )
}

export default ListForm
