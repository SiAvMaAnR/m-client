import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import moment from 'moment'
import config from '../../../../config/configuration'
import './Message.scss'

function Message({ onClick, className, data, image }) {
  const { authorId, authorLogin, text, createdAt } = data
  const userId = useSelector((state) => state.auth.info.id)
  const myMessageClass = +userId === +authorId ? 'my-message' : ''

  const imageSrc = image
    ? `data:image/jpeg;base64, ${image}`
    : `${config.app.publicPath}/defaultImages/direct-channel.jpg`

  const formattedDate = moment(createdAt).format('HH:mm')

  return (
    <div
      className={`c-message ${className} ${myMessageClass}`}
      onClick={onClick}
      role="presentation"
    >
      <div className="author-img">
        <img src={imageSrc} alt="user-img" />
      </div>

      <div className="data-wrapper">
        <div className="message-header">
          <div className="message-author">{authorLogin}</div>
          <div className="message-time">{formattedDate}</div>
        </div>

        <div className="message-content">
          <div className="message-text">{text}</div>
        </div>
      </div>
    </div>
  )
}

Message.defaultProps = {
  onClick: () => {},
  className: '',
  data: null,
  image: null
}

Message.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    authorId: PropTypes.number,
    authorLogin: PropTypes.string,
    createdAt: PropTypes.string
  }),
  image: PropTypes.string
}

export default Message
