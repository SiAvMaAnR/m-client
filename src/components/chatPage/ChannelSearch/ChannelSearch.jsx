import PropTypes from 'prop-types'
import SearchIcon from './SearchIcon/SearchIcon'
import './ChannelSearch.scss'

function ChannelSearch({ className }) {
  return (
    <div className={`c-channel-search ${className}`}>
      <div className="search-icon-container">
        <SearchIcon className="search-icon" />
      </div>

      <div className="search-input-container">
        <input type="text" placeholder='Search'/>
      </div>
    </div>
  )
}

ChannelSearch.defaultProps = {
  className: '',
}

ChannelSearch.propTypes = {
  className: PropTypes.string,
}

export default ChannelSearch
