import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../../api/api'
import { role } from '../../../../utils/constants/system'
import useRole from '../../../../hooks/useRole'
import defaultProfileImg from '../../../../utils/constants/defaultProfileImg'
import MenuIcon from './MenuIcon/MenuIcon'
import './SidebarProfile.scss'
import DropDown from '../../DropDown/DropDown'

function SidebarProfile({ className, isExpand }) {
  const [image, setImage] = useState(null)
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const expandClass = isExpand ? 'expand' : ''
  const userRole = useRole()

  useEffect(() => {
    api.account.image().then((result) => {
      setImage(result?.data?.image || defaultProfileImg)
    })
  }, [])

  useEffect(() => {
    const roleApi = userRole === role.user ? api.user : api.admin

    roleApi.profile().then((result) => {
      setEmail(result?.data?.email ?? 'none')
      setLogin(result?.data?.login ?? 'none')
    })
  }, [userRole])

  const menuItems = [
    {
      icon: <div>TEST</div>,
      title: 'Test',
      onClick: () => {}
    },
    {
      icon: <div>TEST</div>,
      title: 'Test1',
      onClick: () => {}
    },
    {
      icon: <div>TEST</div>,
      title: 'Test2',
      onClick: () => {}
    },
    {
      icon: <div>TEST</div>,
      title: 'Test3',
      onClick: () => {}
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
        <DropDown items={menuItems}>
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
