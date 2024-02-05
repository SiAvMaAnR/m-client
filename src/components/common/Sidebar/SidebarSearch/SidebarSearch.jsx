import PropTypes from 'prop-types'
import SearchIcon from './SearchIcon/SearchIcon'
import './SidebarSearch.scss'

function SidebarSearch({ className, isExpand }) {
  const expandClass = isExpand ? 'expand' : ''

  return (
    <div className={`c-sidebar-search ${className} ${expandClass}`}>
      <div className="search-icon-container">
        <SearchIcon className="search-icon" />
      </div>

      <div className="search-input-container">
        <input type="text" placeholder='Search'/>
      </div>
    </div>
  )
}

SidebarSearch.defaultProps = {
  className: '',
  isExpand: false
}

SidebarSearch.propTypes = {
  className: PropTypes.string,
  isExpand: PropTypes.bool
}

export default SidebarSearch
