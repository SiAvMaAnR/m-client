import PropTypes from 'prop-types'
import Logo from '../../Logo/Logo'
import Brand from '../../Brand/Brand'
import './SidebarHeader.scss'

function SidebarHeader({ className = '', isExpand = false }) {
  const expandClass = isExpand ? 'expand' : ''

  return (
    <div className={`c-sidebar-header ${className} ${expandClass}`}>
      <Logo className="logo" />
      <Brand className="brand">M|7|R</Brand>
    </div>
  )
}

SidebarHeader.propTypes = {
  className: PropTypes.string,
  isExpand: PropTypes.bool
}

export default SidebarHeader
