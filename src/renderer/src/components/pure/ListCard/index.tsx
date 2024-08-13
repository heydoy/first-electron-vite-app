import styled from 'styled-components'
import Button from '@renderer/components/token/Button'

const StyledListCard = styled.div`
  all: unset;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 12px 8px;
  padding: 6px;
  :hover {
    cursor: pointer;
  }
  & > .title {
    font-size: 20px;
    font-weight: 700;
    color: '#000000';
  }
  & > .description {
    font-size: 14px;
    color: '#5e5e5e';
  }
  & > .link {
    font-size: 13px;
    color: '#4433ee';
  }
`
type ListCardProps = {
  index: number
  title: string
  description: string
  link: string
  removeHandler: (e: MouseEvent) => void
  updateHandler: (e: MouseEvent) => void
}

const ListCard = (props: ListCardProps): JSX.Element => {
  const { index, title, description, link, removeHandler, updateHandler } = props

  const handleClick = (): void => {
    window.open(link, '_blank', 'noopener, noreferrer')
  }
  return (
    <StyledListCard onClick={handleClick} key={index}>
      <h1 className="title">{title}</h1>
      <p className="description"> {description} </p>
      <p className="link">{link} </p>
      <Button style={{ color: 'white' }} onClick={removeHandler}>
        삭제
      </Button>
      <Button style={{ color: 'white' }} onClick={updateHandler}>
        수정
      </Button>
    </StyledListCard>
  )
}

export default ListCard
