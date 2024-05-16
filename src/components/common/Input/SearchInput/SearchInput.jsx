import PropTypes from 'prop-types'
import SearchIcon from './SearchIcon/SearchIcon'
import './SearchInput.scss'

function SearchInput({ className, onChange }) {
  return (
    <div className={`c-search-input ${className}`}>
      <div className="search-icon-container">
        <SearchIcon className="search-icon" />
      </div>

      <div className="search-input-container">
        <input type="text" placeholder="Search" onChange={onChange} />
      </div>
    </div>
  )
}

SearchInput.defaultProps = {
  className: '',
  onChange: () => {}
}

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func
}

export default SearchInput
