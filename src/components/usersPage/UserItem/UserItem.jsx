import PropTypes from 'prop-types'
import ToolsIcon from './ToolsIcon/ToolsIcon'
import DropDown from '../../common/DropDown/DropDown'
import { activityStatus } from '../../../constants/system'
import api from '../../../api/api'
import UnblockIcon from './DropDownIcons/Unblock/UnblockIcon'
import BlockIcon from './DropDownIcons/BlockIcon/BlockIcon'
import './UserItem.scss'
import config from '../../../config/configuration'

function UserItem({ className, userInfo, loadUsers }) {
  const { id, login, email, birthday, activityStatus: status, isBanned, image } = userInfo
  const activityStatusClass = status.toLowerCase() === activityStatus.online ? 'online' : ''
  const bannedClass = isBanned ? 'yes' : ''
  const dropDownItems = [
    isBanned
      ? {
          icon: <UnblockIcon />,
          title: 'Unblock',
          onClick: () => {
            api.admin.unblockUser({ id }).then(() => loadUsers())
          }
        }
      : {
          icon: <BlockIcon />,
          title: 'Block',
          onClick: () => {
            api.admin.blockUser({ id }).then(() => loadUsers())
          }
        }
  ]

  const imageSrc = image
    ? `data:image/jpeg;base64, ${image}`
    : `${config.app.publicPath}/defaultImages/direct-channel.jpg`

  return (
    <tr className={`c-user-item ${className}`}>
      <td id="image">
        <img src={imageSrc} alt="user-img" />
      </td>
      <td id="id">{id}</td>
      <td id="email">{email}</td>
      <td id="login">{login}</td>
      <td id="birthday">{birthday}</td>
      <td id="activity-status" className={activityStatusClass}>
        {status}
      </td>
      <td id="banned" className={bannedClass}>
        {isBanned ? 'Yes' : '-'}
      </td>
      <td id="tools">
        <DropDown items={dropDownItems} className="bottom">
          <ToolsIcon className="tools-icon" aria-label="tools" />
        </DropDown>
      </td>
    </tr>
  )
}

UserItem.defaultProps = {
  className: '',
  userInfo: null,
  loadUsers: null
}

UserItem.propTypes = {
  className: PropTypes.string,
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    birthday: PropTypes.string,
    activityStatus: PropTypes.string,
    isBanned: PropTypes.bool
  }),
  loadUsers: PropTypes.func
}

export default UserItem
