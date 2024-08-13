import styled from 'styled-components'

const StyleModal = styled.div`
  width: 300px;
  height: 300px;
  background: #ffffff;
  padding: 1rem;
  position: absolute;
  top: 30%;
  & > h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  label {
    color: black;
  }
`

const Modal = (props: {
  title: string
  onClose: () => void
  content: JSX.Element
}): JSX.Element => {
  const { title, onClose, content } = props

  return (
    <StyleModal className="modal">
      <h2>{title}</h2>
      <div>{content}</div>
      <button onClick={onClose}>Close</button>
    </StyleModal>
  )
}

export default Modal
