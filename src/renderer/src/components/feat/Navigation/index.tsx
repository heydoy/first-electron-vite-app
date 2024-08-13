import styled from 'styled-components'
import ExpandableButton from '../../pure/ExpandableButton'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  height: 100%;
  background-color: orange;
  padding: 14px;
  gap: 20px;
  z-index: 1;
`

// React.ReactNode는 string도 받을 수 있고, <> 꺽쇠도 받을 수 있다.
export type NavigationProps = {
  icon: React.ReactNode
  desc: string
  route: string
}

// 배열 선언할 때 Type[]
// [Type] 이면 요소 1개가 Type인 형태
// Array<Type> 이렇게 할 때 Type 을 요소로 가지는 배열
// <Navigation navList={내용} /> 이면 props: {navList: 내용}
// children을 사용할거면 태그 안 어느 위치에 들어갈지 설정해야함.
// props: { navList: T, children: React.ReactNode} 로 가져온 후 구조분해로 const { navList, children} = props
// return <>..... { children } </> 이런식으로.
const Navigation = (props: { navList: Array<NavigationProps> }): JSX.Element => {
  const { navList } = props
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleRoute = (route: string): void => {
    window.electron.ipcRenderer.send('log', 'go', route)
    navigate(route)
  }

  // - 클로저 개념에 대해 알아보기
  // 외부함수보다 중첩함수의 생명주기가 더 오래 유지되는 경우, 이미 생명주기가 종료된 외부함수의 변수를 참조할 수 있다.
  // 이러한 중첩함수를 클로저라고 한다.
  // 클로저는 상태를 안전하게 변경하고 유지하기 위해 사용된다.
  // 즉 상태를 안전하게 은닉하고 특정함수에게만 상태 변경을 허용할 수 있다.
  const makeHandleRoute = (route: string) => (): void => handleRoute(route)

  const handleNavigationOpen = (): void => {
    setIsOpen((state) => !state)
    handleRoute('/')
  }

  // CSS 적용 우선 순위가 id > class > ...> inline style > ..?
  return (
    <StyledNavigation
      className={isOpen ? 'open' : 'close'}
      id="side-nav"
      style={{ width: isOpen ? 'fit-content' : '100px' }}
    >
      <ExpandableButton icon="Logo" desc="LISA" isOpen={isOpen} onClick={handleNavigationOpen} />
      {navList.map((prop) => (
        <ExpandableButton
          key={prop.desc}
          icon={prop.icon}
          desc={prop.desc}
          isOpen={isOpen}
          onClick={makeHandleRoute(prop.route)}
        />
      ))}
    </StyledNavigation>
  )
}

export default Navigation
