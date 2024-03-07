import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import LightThemeIcon from './LightThemeIcon/LightThemeIcon'
import DarkThemeIcon from './DarkThemeIcon/DarkThemeIcon'
import { theme } from '../../../../constants/system'
import { setTheme } from '../../../../redux/slices/systemSlice'
import './SidebarTheme.scss'

function SidebarTheme({ className, isExpand }) {
  const systemTheme = useSelector((state) => state.system.theme)
  const dispatch = useDispatch()

  const expandClass = isExpand ? 'expand' : ''
  const lightThemeActiveClass = systemTheme === theme.light ? 'active' : ''
  const darkThemeActiveClass = systemTheme === theme.dark ? 'active' : ''

  return (
    <div className={`c-sidebar-theme ${className} ${expandClass}`}>
      <div className="sidebar-theme-container">
        <div
          className={`sidebar-theme ${lightThemeActiveClass}`}
          onClick={() => dispatch(setTheme(theme.light))}
          role="presentation"
        >
          <LightThemeIcon className="sidebar-theme-icon" />
          <div className="sidebar-theme-title">Light</div>
        </div>

        <div
          className={`sidebar-theme ${darkThemeActiveClass}`}
          onClick={() => dispatch(setTheme(theme.dark))}
          role="presentation"
        >
          <DarkThemeIcon className="sidebar-theme-icon" />
          <div className="sidebar-theme-title">Dark</div>
        </div>
      </div>
    </div>
  )
}

SidebarTheme.defaultProps = {
  className: '',
  isExpand: false
}

SidebarTheme.propTypes = {
  className: PropTypes.string,
  isExpand: PropTypes.bool
}

export default SidebarTheme
