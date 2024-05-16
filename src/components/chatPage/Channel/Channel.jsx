import { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { channelType } from '../../../constants/chat'
import config from '../../../config/configuration'
import './Channel.scss'

const defaultImageMapper = {
  [channelType.direct]: 'direct-channel',
  [channelType.public]: 'public-channel',
  [channelType.private]: 'private-channel'
}

function Channel({ onClick, isActive, className, data }) {
  const [counter, setCounter] = useState(99)

  const { image, lastMessage, name, lastActivity, type } = data

  const date = moment(lastActivity)

  const isActiveClass = isActive ? 'active' : ''

  const formattedLastActivity = date.isSame(moment(), 'day')
    ? date.format('HH:mm')
    : date.format('D MMM')

  const imageSrc = image
    ? `data:image/jpeg;base64, ${image}`
    : `${config.app.publicPath}/defaultImages/${defaultImageMapper[type]}.jpg`

  return (
    <div
      className={`c-channel ${isActiveClass} ${className}`}
      onClick={onClick}
      role="presentation"
    >
      <div className="channel-image">
        <img src={imageSrc} alt="channel-img" />
      </div>

      <div className="channel-info">
        <div className="channel-info-top">
          <div className="title">{name ?? 'none'}</div>
          <div className="activity">{formattedLastActivity}</div>
        </div>

        <div className="channel-info-bottom">
          {lastMessage && (
            <>
              <div className="message">
                <b>
                  <span>{lastMessage.author}</span>
                  <span>: </span>
                </b>
                <span>{lastMessage.content}</span>
              </div>
              <div className="counter">
                <div>{counter}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

Channel.defaultProps = {
  onClick: () => {},
  className: '',
  data: null,
  isActive: false
}

Channel.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.shape({
    image: PropTypes.string,
    lastMessage: PropTypes.shape({
      author: PropTypes.string,
      content: PropTypes.string
    }),
    name: PropTypes.string,
    lastActivity: PropTypes.string,
    type: PropTypes.string
  }),
  isActive: PropTypes.bool
}

export default Channel
