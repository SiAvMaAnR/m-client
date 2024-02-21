import PropTypes from 'prop-types'
import './Pagination.scss'
import PaginationIcon from './PaginationIcon/PaginationIcon'

function Pagination({ className, current, count }) {
  return (
    <div className={`c-pagination ${className}`}>
      <div className="pagination-previous">
        <span className="pagination-arrow">
          <PaginationIcon className="pagination-arrow-icon" />
        </span>
        <span className="pagination-text">Previous</span>
      </div>

      <div className="pagination-info">
        <span className="current-index">1</span> of <span>10</span>
      </div>

      <div className="pagination-next">
        <span className="pagination-text">Next</span>
        <span className="pagination-arrow">
          <PaginationIcon className="pagination-arrow-icon" />
        </span>
      </div>
    </div>
  )
}

Pagination.defaultProps = {
  className: '',
  current: 0,
  count: 0
}

Pagination.propTypes = {
  className: PropTypes.string,
  current: PropTypes.number,
  count: PropTypes.number
}

export default Pagination
