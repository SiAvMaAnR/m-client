import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { page } from '../../../../constants/system'
import { useAuth } from '../../../../hooks/_exports'
import MenuIcon from '../../Icon/MenuIcon/MenuIcon'
import DropDown from '../../DropDown/DropDown'
import config from '../../../../config/configuration'
import './SidebarProfile.scss'
import { LogoutIcon, ProfileIcon, SettingsIcon } from '../../Icon/_exports'

function SidebarProfile({ className = '', isExpand = false }) {
  const { login, email, image } = useSelector((state) => state.user.info)
  const expandClass = isExpand ? 'expand' : ''
  const { logOut } = useAuth()
  const navigate = useNavigate()

  const menuItems = [
    {
      icon: <ProfileIcon />,
      title: 'Profile',
      onClick: () => {
        navigate(page.profile)
      }
    },
    {
      icon: <SettingsIcon />,
      title: 'Settings',
      onClick: () => {
        navigate(page.settings)
      }
    },
    {
      icon: <LogoutIcon />,
      title: 'LogOut',
      onClick: () => {
        logOut()
        navigate(page.login)
      }
    }
  ]

  const imageSrc = image
    ? `data:image/jpeg;base64, ${image}`
    : `${config.app.publicPath}/defaultImages/user-profile.jpg`

  return (
    <div className={`c-sidebar-profile ${className} ${expandClass}`}>
      <div className="sidebar-profile-image">
        <img
          src={imageSrc}
          alt="profile-img"
          onClick={() => navigate(page.profile)}
          role="presentation"
        />
      </div>

      <div className="sidebar-profile-info">
        <div className="sidebar-profile-login">{login}</div>
        <div className="sidebar-profile-email">{email}</div>
      </div>

      <div className="sidebar-profile-menu">
        <DropDown items={menuItems} className="right">
          <MenuIcon className="menu-icon" />
        </DropDown>
      </div>
    </div>
  )
}

SidebarProfile.propTypes = {
  className: PropTypes.string,
  isExpand: PropTypes.bool
}

export default SidebarProfile
