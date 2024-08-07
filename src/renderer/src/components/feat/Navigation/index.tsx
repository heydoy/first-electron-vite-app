import styled from 'styled-components'
import IconButton from '../../pure/IconButton'
import { useState } from 'react'

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  height: 100%;
  background-color: orange;
  padding: 10px;
  gap: 20px;
  z-index: 1;
`

const Navigation = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigationOpen = (): void => {
    setIsOpen((state) => !state)
  }

  const makeHandleRoute = (route: string) => (): void => {
    window.electron.ipcRenderer.send('log', 'go', route)
  }

  return (
    <Nav className={isOpen ? 'open' : 'close'}>
      <IconButton icon="LISA" desc="Inspection" isOpen={isOpen} onClick={handleNavigationOpen} />
      <IconButton
        icon="label"
        desc="labeling"
        isOpen={isOpen}
        onClick={makeHandleRoute('labeling')}
      />
      <IconButton icon="list" desc="list" isOpen={isOpen} onClick={makeHandleRoute('list')} />
    </Nav>
  )
}

export default Navigation
