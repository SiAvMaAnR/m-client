import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import config from '../../../../config/configuration'
import defaultImageMapper from '../../../../utils/mappers/defaultImageMapper'
import ImgWrapper from '../../../common/ImgWrapper/ImgWrapper'
import './Channel.scss'

function Channel({ onClick = () => {}, isActive = false, className = '', data = null }) {
  const [counter, setCounter] = useState(0)

  const { image, lastMessage, name, lastActivity, type, unreadMessagesCount } = data

  const date = moment(lastActivity)

  const isActiveClass = isActive ? 'active' : ''

  const formattedLastActivity = date.isSame(moment(), 'day')
    ? date.format('HH:mm')
    : date.format('D MMM')

  const imageSrc = image
    ? `data:image/jpeg;base64, ${image}`
    : `${config.app.publicPath}/defaultImages/${defaultImageMapper[type]}.jpg`

  useEffect(() => {
    setCounter(unreadMessagesCount)
  }, [unreadMessagesCount])

  return (
    <div
      className={`c-channel ${isActiveClass} ${className}`}
      onClick={onClick}
      role="presentation"
    >
      <div className="channel-image">
        <ImgWrapper src={imageSrc} alt="channel-img" isLazy />
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
              {!!counter && (
                <div className="counter">
                  <div>{counter}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
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
    type: PropTypes.string,
    unreadMessagesCount: PropTypes.number
  }),
  isActive: PropTypes.bool
}

export default Channel
