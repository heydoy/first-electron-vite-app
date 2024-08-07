import styled from 'styled-components'
import Button from '../../token/Button'

// 📌 styled(컴포넌트)의 의미
// 스타일 익스텐딩. 컴포넌트를 상속해서 styled()생성자 안에 래핑해서 오버라이드 할 수 있는 새로운 컴포넌트를 만든다.
// 참고: https://styled-components.com/docs/basics#extending-styles
// 📌 styled components의 & 의미
// &는 현재의 요소를 뜻한다. 여기서는 ExpandableButton을 의미한다.
// 참고: https://velog.io/@nowod_it/React-Styled-Components의-Ampersand-의미
// &.open 이것은 현재 요소(ExpandableButton)이 open이라는 클래스를 갖고있을 때를 의미한다.
// open 일 경우 desc display를 block
// 아닐 경우에는 desc는 display가 none
// 📌 display 속성
// block: 너비와 높이를 가진다 / inline: 너비와 높이를 가질 수 없다. 엘리먼트 크기 따라 유동적인 크기
// inline-block: 너비와 높이를 가질 수 잇으나 요소 사이에 알 수 없는 공간..(?)
// flex: 직속 부모 요소가 자식 요소를 위치시킨다.
// 참고: https://yebeen-study-note.tistory.com/21
// 참고: https://yebeen-study-note.tistory.com/22
const StyledExpandableButton = styled(Button)`
  display: flex;
  flex-direction: row;
  gap: 12px;

  &.open {
    & > .desc {
      display: block;
    }
  }
  & > .icon,
  & > .desc {
    font-size: 16px;
    color: white;
  }
  & > .icon {
    font-weight: 700;
  }
  & > .desc {
    display: none;
  }
`

// React.ReactNode는 string도 받을 수 있고, <> 꺽쇠도 받을 수 있다.
type ExpandableButtonProps = {
  icon: React.ReactNode
  desc: string
  isOpen: boolean
  onClick: () => void
}

const ExpandableButton = (props: ExpandableButtonProps): JSX.Element => {
  const { icon, desc, isOpen, onClick } = props
  return (
    <StyledExpandableButton className={isOpen ? 'open' : undefined} onClick={onClick}>
      <span className="icon">{icon}</span>
      <span className="desc">{desc}</span>
    </StyledExpandableButton>
  )
}
export default ExpandableButton
