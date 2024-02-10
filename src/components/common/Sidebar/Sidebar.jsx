import { useState } from 'react'
import { page, role } from '../../../utils/constants/system'
import useKeyDown from '../../../hooks/useKeyDown'
import SidebarItem from './SidebarItem/SidebarItem'
import SidebarHeader from './SidebarHeader/SidebarHeader'
import SidebarSearch from './SidebarSearch/SidebarSearch'
import SidebarTheme from './SidebarTheme/SidebarTheme'
import SidebarProfile from './SidebarProfile/SidebarProfile'
import SidebarExpander from './SidebarExpander/SidebarExpander'
import HomeIcon from './SidebarIcons/HomeIcon/HomeIcon'
import MessengerIcon from './SidebarIcons/MessengerIcon/MessengerIcon'
import UsersIcon from './SidebarIcons/UsersIcon/UsersIcon'
import './Sidebar.scss'
import ComponentPermissionGuard from '../../permission/ComponentPermissionGuard'

function Sidebar() {
  const [expand, setExpand] = useState(false)
  // counters to slice

  const expandHandler = () => {
    setExpand(!expand)
  }

  const style = {
    expand: expand ? 'expand' : ''
  }

  useKeyDown(
    (event) => {
      if (event.ctrlKey) {
        setExpand((isExpand) => !isExpand)
      }
    },
    ['B', 'b']
  )

  return (
    <div className={`c-sidebar ${style.expand}`} role="presentation">
      <div className="sidebar-expander-container" onClick={expandHandler} role="presentation">
        <SidebarExpander className="sidebar-expander" />
      </div>

      <div className="sidebar-header-container">
        <SidebarHeader className="sidebar-header" isExpand={expand} />
      </div>

      <div className="sidebar-search-container">
        <SidebarSearch className="sidebar-search" isExpand={expand} />
      </div>

      <div className="sidebar-items-container">
        <SidebarItem
          className="sidebar-item"
          link={page.home}
          title="Home"
          isExpand={expand}
          noticeCounter={1}
        >
          <HomeIcon />
        </SidebarItem>

        <SidebarItem
          className="sidebar-item"
          link={page.chat}
          title="Messenger"
          isExpand={expand}
          noticeCounter={1}
        >
          <MessengerIcon />
        </SidebarItem>

        <ComponentPermissionGuard permittedRoles={[role.admin]}>
          <SidebarItem
            className="sidebar-item"
            link={page.users}
            title="Users"
            isExpand={expand}
            noticeCounter={1}
          >
            <UsersIcon />
          </SidebarItem>
        </ComponentPermissionGuard>
      </div>

      <div className="sidebar-theme-container">
        <SidebarTheme className="sidebar-theme" isExpand={expand} />
      </div>

      <div className="sidebar-profile-container">
        <SidebarProfile className="sidebar-profile" isExpand={expand} />
      </div>
    </div>
  )
}

Sidebar.propTypes = {}

export default Sidebar
