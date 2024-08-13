const Modal = (props: {
  title: string
  onClose: () => void
  content: JSX.Element
}): JSX.Element => {
  const { title, onClose, content } = props

  return (
    <div className="modal">
      <h2>{title}</h2>
      <div>{content}</div>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default Modal
