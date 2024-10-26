import PropTypes from 'prop-types'
import './PageHeader.scss'

function PageHeader({ className = '', text = '', children }) {
  return (
    <div className={`c-page-header ${className}`}>
      <div className="page-header-text">{text}</div>

      <div className="page-header-options">{children}</div>
    </div>
  )
}

PageHeader.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
}

export default PageHeader
