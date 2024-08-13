import PropTypes from 'prop-types'
import SearchIcon from '../../../common/Icon/SearchIcon/SearchIcon'
import './ChannelSearch.scss'

function ChannelSearch({ className = '', onChange = () => {} }) {
  return (
    <div className={`c-channel-search ${className}`}>
      <div className="search-icon-container">
        <SearchIcon className="search-icon" />
      </div>

      <div className="search-input-container">
        <input type="text" placeholder="Search" onChange={onChange} />
      </div>
    </div>
  )
}

ChannelSearch.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func
}

export default ChannelSearch
