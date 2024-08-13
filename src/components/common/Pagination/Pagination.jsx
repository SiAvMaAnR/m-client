import PropTypes from 'prop-types'
import PaginationIcon from './PaginationIcon/PaginationIcon'
import './Pagination.scss'

function Pagination({
  className = '',
  pageNumber = 0,
  pagesCount = 0,
  onNext = () => {},
  onPrev = () => {}
}) {
  return (
    <div className={`c-pagination ${className}`}>
      <div className="pagination-previous" onClick={onPrev} role="presentation">
        <span className="pagination-arrow">
          <PaginationIcon className="pagination-arrow-icon" />
        </span>
        <span className="pagination-text">Previous</span>
      </div>

      <div className="pagination-info">
        <span className="current-index">{pageNumber + 1}</span> of <span>{pagesCount}</span>
      </div>

      <div className="pagination-next" onClick={onNext} role="presentation">
        <span className="pagination-text">Next</span>
        <span className="pagination-arrow">
          <PaginationIcon className="pagination-arrow-icon" />
        </span>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  className: PropTypes.string,
  pageNumber: PropTypes.number,
  pagesCount: PropTypes.number,
  onNext: PropTypes.func,
  onPrev: PropTypes.func
}

export default Pagination
