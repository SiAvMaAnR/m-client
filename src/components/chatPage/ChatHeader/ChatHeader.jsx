import PropTypes from 'prop-types'
import defaultImageMapper from '../../../utils/mappers/defaultImageMapper'
import config from '../../../config/configuration'
import { channelType } from '../../../constants/chat'
import { MenuIcon } from '../../common/Icon/_exports'
import { activityStatus } from '../../../constants/system'
import ImgWrapper from '../../common/ImgWrapper/ImgWrapper'
import Loader2 from '../../common/Loader/Loader2/Loader2'
import MessageSearch from './MessageSearch/MessageSearch'
import formatLastOnlineAt from '../../../utils/helpers/formatHelper'
import './ChatHeader.scss'

export const getActivityStatus = ({ status, lastOnlineAt }) => {
  const isOnline = status?.toLowerCase() === activityStatus.online

  const result = isOnline ? 'Online now' : formatLastOnlineAt(lastOnlineAt)

  return result
}

function ChatHeader({ className = '', channel = null, isLoading, setSearchMessage }) {
  const imageSrc = channel?.image
    ? `data:image/jpeg;base64, ${channel.image}`
    : `${config.app.publicPath}/defaultImages/channels/${defaultImageMapper[channel?.type]}.jpg`

  const adaptedChatInfo = getActivityStatus({
    status: channel?.userActivityStatus,
    lastOnlineAt: channel?.userLastOnlineAt
  })

  return (
    <div className={`c-chat-header ${className}`}>
      {isLoading ? (
        <Loader2 className="loader" />
      ) : (
        <>
          <div className="image">
            {channel && <ImgWrapper src={imageSrc} alt="channel-img" isLazy />}
          </div>

          <div className="info">
            <div className="channel-name">{channel?.name}</div>

            <div className="additional-info">
              {channel?.type === channelType.direct ? (
                <div className="status-info">{adaptedChatInfo}</div>
              ) : (
                <div className="members-count">Members: {channel?.membersCount}</div>
              )}
            </div>
          </div>

          <div className="search-wrapper">
            <MessageSearch className="search" setSearchMessage={setSearchMessage} />
          </div>

          <div className="menu">
            <MenuIcon className="menu-icon" />
          </div>
        </>
      )}
    </div>
  )
}

ChatHeader.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  setSearchMessage: PropTypes.func,
  channel: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    membersCount: PropTypes.number,
    userActivityStatus: PropTypes.string,
    userLastOnlineAt: PropTypes.string
  })
}

export default ChatHeader
