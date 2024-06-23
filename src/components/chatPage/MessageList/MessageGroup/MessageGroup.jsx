import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import config from '../../../../config/configuration'
import Message from '../Message/Message'
import './MessageGroup.scss'

function MessageGroup({ className, group }) {
  const { authorId, authorLogin, image, createdAt, messages } = group
  const userId = useSelector((state) => state.auth.info.id)
  const myGroupClass = +userId === +authorId ? 'my-group' : ''

  const imageSrc = image
    ? `data:image/jpeg;base64, ${image}`
    : `${config.app.publicPath}/defaultImages/direct-channel.jpg`

  const formattedDate = moment(createdAt).format('HH:mm')

  return (
    <div className={`c-message-group ${className} ${myGroupClass}`}>
      <div className="author-img">
        <img src={imageSrc} alt="user-img" />
      </div>

      <div className="data-wrapper">
        <div className="group-header">
          <div className="group-author">{authorLogin}</div>
          <div className="group-time">{formattedDate}</div>
        </div>

        <div className="group-messages">
          {messages.map((message) => (
            <Message key={message.id} message={message} className={myGroupClass} />
          ))}
        </div>
      </div>
    </div>
  )
}

MessageGroup.defaultProps = {
  className: '',
  group: null
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
    image: PropTypes.string
  })
}

export default MessageGroup
