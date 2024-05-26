import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import api from '../../../api/api'
import defaultImageMapper from '../../../utils/mappers/defaultImageMapper'
import './ChatHeader.scss'
import config from '../../../config/configuration'
import { channelType } from '../../../constants/chat'
import { activityStatus } from '../../../constants/system'

function ChatHeader({ className, channelId }) {
  const [channel, setChannel] = useState(null)

  const loadChannel = async (id) => {
    const result = await api.channel.accountChannel({ id })

    setChannel(result.data)
  }

  useEffect(() => {
    loadChannel(channelId)
  }, [channelId])

  const imageSrc = channel?.image
    ? `data:image/jpeg;base64, ${channel.image}`
    : `${config.app.publicPath}/defaultImages/${defaultImageMapper[channel?.type]}.jpg`

  return channel ? (
    <div className={`c-chat-header ${className}`}>
      <div className="image">
        <img src={imageSrc} alt="channel-img" />
      </div>

      <div className="info">
        <div className="channel-name">{channel.name}</div>

        <div className="additional-info">
          {channel.type === channelType.direct ? (
            <div className="last-online">{channel.userActivityStatus}</div>
          ) : (
            <div className="members-count">{channel.membersCount} members</div>
          )}
        </div>
      </div>

      <div className="search">.</div>

      <div className="menu">.</div>
    </div>
  ) : null
}

ChatHeader.defaultProps = {
  className: '',
  channelId: null
}

ChatHeader.propTypes = {
  className: PropTypes.string,
  channelId: PropTypes.number
}

export default ChatHeader
