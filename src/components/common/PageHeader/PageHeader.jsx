import PropTypes from 'prop-types'
import './PageHeader.scss'

function PageHeader({ className = '', text = '' }) {
  return (
    <div className={`c-page-header ${className}`}>
      <div className="page-header-text">{text}</div>
    </div>
  )
}

PageHeader.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string
}

export default PageHeader
