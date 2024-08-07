import styled from 'styled-components'
import Button from '../../token/Button'

const StyledIconButton = styled(Button)`
  display: flex;
  flex-direction: row;
  gap: 30px;

  &.open {
    & > .desc {
      display: block;
    }
  }
  & > .icon,
  & > .desc {
    font-size: 20px;
    color: white;
  }
  & > .icon {
    font-weight: 700;
  }
  & > .desc {
    display: none;
  }
`

type IconButtonProps = {
  icon: string
  desc: string
  isOpen: boolean
  onClick: () => void
}

const IconButton = (props: IconButtonProps): JSX.Element => {
  const { icon, desc, isOpen, onClick } = props
  return (
    <StyledIconButton className={isOpen ? 'open' : undefined} onClick={onClick}>
      <span className="icon">{icon}</span>
      <span className="desc">{desc}</span>
    </StyledIconButton>
  )
}

export default IconButton
