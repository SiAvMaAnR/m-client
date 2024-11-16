import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import config from '../../../../../config/configuration'
import { activityStatus, page } from '../../../../../constants/system'
import { RoundCheckbox } from '../../../../_exports'
import { ArrowIcon } from '../../../../common/Icon/_exports'
import api from '../../../../../api/api'
import { getActivityStatus } from '../../../ChatHeader/ChatHeader'
import ImgWrapper from '../../../../common/ImgWrapper/ImgWrapper'
import './UserItem.scss'

function UserItem({
  className = '',
  userInfo = null,
  isChecked = false,
  onToggle = () => {},
  setIsActive = () => {}
}) {
  const navigate = useNavigate()
  const { id, login, activityStatus: status, isBanned, image } = userInfo
  const statusClass = status.toLowerCase() === activityStatus.online ? 'online' : ''
  const bannedClass = isBanned ? 'yes' : ''

  const imageSrc = image
    ? `data:image/jpeg;base64, ${image}`
    : `${config.app.publicPath}/defaultImages/channels/direct-channel.jpg`

  const onClickHandler = () => {
    onToggle(id)
  }

  const onClickDirectHandler = async (event) => {
    event.stopPropagation()

    const { data: chatId } = await api.channel.setUpDirectChannel({
      partnerId: id
    })

    if (chatId) {
      navigate(`${page.chat}/${chatId}`)
      setIsActive(false)
    }
  }

  const adaptedActivityStatus = getActivityStatus({
    status: userInfo.activityStatus,
    lastOnlineAt: userInfo.lastOnlineAt
  })

  return (
    <div
      className={`c-chat-user-item ${className} ${statusClass} ${bannedClass}`}
      onClick={onClickHandler}
      role="presentation"
    >
      <div className="select">
        <RoundCheckbox className="round-checkbox" checked={isChecked} />
      </div>

      <div id="image">
        <ImgWrapper src={imageSrc} alt="user-img" />
      </div>

      <div className="user-info">
        <div id="login">{login}</div>
        <div id="activity">{adaptedActivityStatus}</div>
      </div>

      <div className="direct" onClick={onClickDirectHandler} role="presentation">
        <ArrowIcon className="arrow-icon" />
      </div>
    </div>
  )
}

UserItem.propTypes = {
  className: PropTypes.string,
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    activityStatus: PropTypes.string,
    lastOnlineAt: PropTypes.string,
    isBanned: PropTypes.bool
  }),
  isChecked: PropTypes.bool,
  onToggle: PropTypes.func,
  setIsActive: PropTypes.func
}

export default UserItem
