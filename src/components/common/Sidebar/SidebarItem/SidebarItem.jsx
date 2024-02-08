import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './SidebarItem.scss'

function SidebarItem({ isExpand, className, title, children, link, noticeCounter }) {
  const expandClass = isExpand ? 'expand' : ''

  return (
    <Link className={`c-sidebar-item ${className} ${expandClass}`} to={link}>
      <div className="sidebar-item-icon">{children}</div>
      <div className="sidebar-item-title">{title}</div>
      <div className="sidebar-item-noticeCounter">{noticeCounter}</div>
    </Link>
  )
}

SidebarItem.defaultProps = {
  className: '',
  isExpand: false,
  title: '',
  link: '',
  noticeCounter: 0,
  children: null
}

SidebarItem.propTypes = {
  className: PropTypes.string,
  isExpand: PropTypes.bool,
  title: PropTypes.string,
  link: PropTypes.string,
  noticeCounter: PropTypes.number,
  children: PropTypes.element
}

export default SidebarItem
