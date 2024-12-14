import './_index.scss'

type MessageProps = {
  text: string
  status: string
}

const Message = (props: MessageProps) => {
  return <p className={`message ${props.status}`}>{props.text}</p>
}
export default Message
