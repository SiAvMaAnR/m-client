import PropTypes from 'prop-types'
import moment from 'moment'
import { useSelector } from 'react-redux'
import DoubleTickIcon from '../../../common/Icon/DoubleTickIcon/DoubleTickIcon'
import config from '../../../../config/configuration'
import Message from '../Message/Message'
import ImgWrapper from '../../../common/ImgWrapper/ImgWrapper'
import './MessageGroup.scss'

function MessageGroup({ className = '', group = null, observerRef = null }) {
  const { authorId, authorLogin, image, createdAt, messages, isRead } = group
  const userId = useSelector((state) => state.auth.info.id)
  const myGroupClass = +userId === +authorId ? 'my-group' : ''
  const readClass = isRead ? 'read' : ''

  const imageSrc = image
    ? `data:image/jpeg;base64, ${image}`
    : `${config.app.publicPath}/defaultImages/channels/direct-channel.jpg`

  const formattedDate = moment(createdAt).format('HH:mm')

  return (
    <div className={`c-message-group ${className} ${myGroupClass}`}>
      <div className="author-img">
        <ImgWrapper src={imageSrc} alt="user-img" isLazy />
      </div>

      <div className="data-wrapper">
        <div className="group-header">
          <div className="group-author">{authorLogin}</div>
          <div className="group-time">{formattedDate}</div>
          <DoubleTickIcon className={`group-read ${readClass}`} />
        </div>

        <div className="group-messages">
          {messages.map((message) => (
            <Message
              observerRef={observerRef}
              key={message.id}
              message={message}
              className={myGroupClass}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

MessageGroup.propTypes = {
  className: PropTypes.string,
  group: PropTypes.shape({
    id: PropTypes.number,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string
      })
    ),
    authorId: PropTypes.number,
    authorLogin: PropTypes.string,
    createdAt: PropTypes.string,
    image: PropTypes.string,
    isRead: PropTypes.bool
  }),
  observerRef: PropTypes.shape({
    current: PropTypes.instanceOf(IntersectionObserver)
  }),
}

export default MessageGroup
