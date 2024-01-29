import PropTypes from 'prop-types'
import './FormTitle.scss'

function FormTitle({ children, className }) {
  return <div className={`c-form-title ${className}`}>{children}</div>
}

FormTitle.defaultProps = {
  children: '',
  className: ''
}

FormTitle.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
}

export default FormTitle
