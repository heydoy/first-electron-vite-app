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
}

const StyledListCardButton = styled(Button)`
  bgcolor: black;
  color: white;
  font-size: 14px;
`

type StyledListCardButtonProps = {
  title: string
  // color: string
  // bgColor: string
  // hoverBgColor: string
  onClick: () => void
}

const ListCardButton = (props: StyledListCardButtonProps): JSX.Element => {
  const { title, onClick } = props

  return <StyledListCardButton onClick={onClick}>{title}</StyledListCardButton>
}

const ListCard = (props: ListCardProps): JSX.Element => {
  const { index, title, description, link } = props

  const handleClick = (): void => {
    window.open(link, '_blank', 'noopener, noreferrer')
  }
  return (
    <StyledListCard onClick={handleClick} key={index}>
      <h1 className="title">{title}</h1>
      <p className="description"> {description} </p>
      <p className="link">{link} </p>
      <ListCardButton
        title="삭제"
        onClick={() => {
          console.log('삭제')
        }}
      ></ListCardButton>
      <ListCardButton
        title="업데이트"
        onClick={() => {
          console.log('업데이트')
        }}
      ></ListCardButton>
    </StyledListCard>
  )
}

export default ListCard
