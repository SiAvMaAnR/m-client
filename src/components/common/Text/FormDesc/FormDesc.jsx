import PropTypes from 'prop-types'
import './FormDesc.scss'

function FormDesc({ children, className }) {
  return <div className={`c-form-desc ${className}`}>{children}</div>
}

FormDesc.defaultProps = {
  children: '',
  className: ''
}

FormDesc.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
}

export default FormDesc
