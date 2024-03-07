import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import api from '../../../../api/api'
import { page, role } from '../../../../constants/system'
import useRole from '../../../../hooks/useRole'
import useAuth from '../../../../hooks/useAuth'
import defaultProfileImg from '../../../../constants/defaultProfileImg'
import MenuIcon from './MenuIcon/MenuIcon'
import DropDown from '../../DropDown/DropDown'
import LogoutIcon from './MenuIcons/LogoutIcon/LogoutIcon'
import SettingsIcon from './MenuIcons/SettingsIcon/SettingsIcon'
import './SidebarProfile.scss'

function SidebarProfile({ className, isExpand }) {
  const [image, setImage] = useState(null)
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const expandClass = isExpand ? 'expand' : ''
  const userRole = useRole()
  const { logOut } = useAuth()
  const navigate = useNavigate()
  const roleApi = userRole === role.user ? api.user : api.admin

  useEffect(() => {
    api.account.image().then((result) => {
      setImage(result?.data?.image || defaultProfileImg)
    })
  }, [])

  useEffect(() => {
    roleApi.profile().then((result) => {
      setEmail(result?.data?.email ?? 'none')
      setLogin(result?.data?.login ?? 'none')
    })
  }, [userRole, roleApi])

  const menuItems = [
    {
      icon: <SettingsIcon />,
      title: 'Settings',
      onClick: () => {}
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

  return (
    <div className={`c-sidebar-profile ${className} ${expandClass}`}>
      <div className="sidebar-profile-image">
        <img src={image ? `data:image/jpeg;base64, ${image}` : ''} alt="profile-img" />
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

SidebarProfile.defaultProps = {
  className: '',
  isExpand: false
}

SidebarProfile.propTypes = {
  className: PropTypes.string,
  isExpand: PropTypes.bool
}

export default SidebarProfile
