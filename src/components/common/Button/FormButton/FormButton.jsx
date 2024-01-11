import PropTypes from 'prop-types'
import Loader2 from '../../Loader/Loader2/Loader2'
import './FormButton.scss'

function FormButton({ onClick, className, isActive, isLoading, children }) {
  return (
    <button
      type="button"
      className={`c-form-btn ${className}`}
      onClick={onClick}
      disabled={!isActive}
    >
      {isLoading ? <Loader2 /> : children}
    </button>
  )
}

FormButton.defaultProps = {
  onClick: () => {},
  isLoading: false,
  isActive: false,
  children: '',
  className: ''
}

FormButton.propTypes = {
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  isActive: PropTypes.bool,
  children: PropTypes.string,
  className: PropTypes.string
}

export default FormButton
