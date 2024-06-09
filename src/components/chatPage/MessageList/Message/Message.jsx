import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import './Message.scss'

function Message({ onClick, className, data, isMainMessage }) {
  const { authorId, text } = data
  const userId = useSelector((state) => state.auth.info.id)
  const myMessageClass = +userId === +authorId ? 'my-message' : ''

  return (
    <div
      className={`c-message ${className} ${myMessageClass}`}
      onClick={onClick}
      role="presentation"
    >
      <div className="data-wrapper">
        <div className="author-img">{}</div>
        <div className="message-text">{text}</div>
      </div>
    </div>
  )
}

Message.defaultProps = {
  onClick: () => {},
  className: '',
  data: null,
  isMainMessage: true
}

Message.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    authorId: PropTypes.number
  }),
  isMainMessage: PropTypes.bool
}

export default Message
