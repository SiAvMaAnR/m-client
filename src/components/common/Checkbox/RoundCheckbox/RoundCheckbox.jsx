import PropTypes from 'prop-types'
import './RoundCheckbox.scss'

function RoundCheckbox({ className }) {
  return <input className={`c-round-checkbox ${className}`} type="checkbox" />
}

RoundCheckbox.defaultProps = {
  className: ''
}

RoundCheckbox.propTypes = {
  className: PropTypes.string
}

export default RoundCheckbox
