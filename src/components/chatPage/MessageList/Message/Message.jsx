import PropTypes from 'prop-types'
import './Message.scss'

function Message({ onClick, className, message }) {
  const { text } = message

  return (
    <div className={`c-message ${className}`} onClick={onClick} role="presentation">
      <div className="message-text">{text}</div>
    </div>
  )
}

Message.defaultProps = {
  onClick: () => {},
  className: '',
  message: null
}

Message.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  message: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string
  })
}

export default Message
