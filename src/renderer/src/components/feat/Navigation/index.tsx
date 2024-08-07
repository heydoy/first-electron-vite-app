import styled from 'styled-components'
import ExpandableButton from '../../pure/ExpandableButton'
import { useState } from 'react'

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

  const handleNavigationOpen = (): void => {
    setIsOpen((state) => !state)
  }

  const makeHandleRoute = (route: string) => (): void => {
    window.electron.ipcRenderer.send('log', 'go', route)
  }

  return (
    <StyledNavigation className={isOpen ? 'open' : 'close'}>
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
