import PropTypes from 'prop-types'
import config from '../../../../../config/configuration'
import { activityStatus } from '../../../../../constants/system'
import { RoundCheckbox } from '../../../../_exports'
import ArrowIcon from '../../../../common/Icon/ArrowIcon/ArrowIcon'
import './UserItem.scss'

function UserItem({ className, userInfo, isChecked, onToggle }) {
  const { id, login, activityStatus: status, isBanned, image } = userInfo
  const statusClass = status.toLowerCase() === activityStatus.online ? 'online' : ''
  const bannedClass = isBanned ? 'yes' : ''

  const imageSrc = image
    ? `data:image/jpeg;base64, ${image}`
    : `${config.app.publicPath}/defaultImages/user-profile.jpg`

  const onClickHandler = () => {
    onToggle(id)
  }

  const onClickDirectHandler = (event) => {
    event.stopPropagation()
    // go to direct
  }

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
        <img src={imageSrc} alt="user-img" />
      </div>

      <div id="login">{login}</div>

      <div className="direct" onClick={onClickDirectHandler} role="presentation">
        <ArrowIcon className="arrow-icon" />
      </div>
    </div>
  )
}

UserItem.defaultProps = {
  className: '',
  userInfo: null,
  isChecked: false,
  onToggle: () => {}
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
    isBanned: PropTypes.bool
  }),
  isChecked: PropTypes.bool,
  onToggle: PropTypes.func
}

export default UserItem
