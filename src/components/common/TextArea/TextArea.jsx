import PropTypes from 'prop-types'
import './TextArea.scss'

function TextArea({ className, onChange, value, placeholder, required = false }) {
  return (
    <div className={`c-textarea ${className}`}>
      <textarea onChange={onChange} value={value} placeholder={placeholder} required={required} />
    </div>
  )
}

TextArea.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool
}

export default TextArea
