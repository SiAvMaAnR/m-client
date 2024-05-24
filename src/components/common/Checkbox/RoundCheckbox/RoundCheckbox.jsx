import PropTypes from 'prop-types'
import './RoundCheckbox.scss'

function RoundCheckbox({ className, onChange, checked }) {
  return (
    <input
      className={`c-round-checkbox ${className}`}
      type="checkbox"
      onChange={onChange}
      checked={checked}
    />
  )
}

RoundCheckbox.defaultProps = {
  className: '',
  onChange: () => {},
  checked: false
}

RoundCheckbox.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool
}

export default RoundCheckbox
