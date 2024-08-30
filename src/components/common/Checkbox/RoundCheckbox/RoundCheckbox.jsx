import PropTypes from 'prop-types'
import './RoundCheckbox.scss'

function RoundCheckbox({ className = '', onChange = () => {}, checked = false }) {
  return (
    <input
      className={`c-round-checkbox ${className}`}
      type="checkbox"
      onChange={onChange}
      checked={checked}
    />
  )
}

RoundCheckbox.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool
}

export default RoundCheckbox
