import PropTypes from 'prop-types'
import './DDItem.scss'

function DDItem({ className = '', icon = null, title = '', onClick = null }) {
  return (
    <div className={`c-dd-item ${className}`} onClick={onClick} role="presentation">
      <div className="dd-item-icon">{icon}</div>
      <div className="dd-item-text">{title}</div>
    </div>
  )
}

DDItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element,
  title: PropTypes.string,
  onClick: PropTypes.func
}

export default DDItem
