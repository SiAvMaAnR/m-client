import { useState } from 'react'
import PropTypes from 'prop-types'
import ShowIcon from './ShowIcon/ShowIcon'
import HideIcon from './HideIcon/HideIcon'
import './FormInput.scss'

function FormInput({
  placeholder,
  type,
  autoComplete,
  onChange,
  value,
  className,
  required,
  pattern
}) {
  const isPassword = type === 'password'
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  const toggleClickHandler = () => {
    setIsVisiblePassword(!isVisiblePassword)
  }

  const toggleKeyDownHandler = (event) => {
    if (event.key === 'Alt') {
      setIsVisiblePassword(true)
    }
  }

  const toggleKeyUpHandler = (event) => {
    if (event.key === 'Alt') {
      setIsVisiblePassword(false)
    }
  }

  return (
    <div
      className="form-input-wrapper"
      onKeyDown={toggleKeyDownHandler}
      onKeyUp={toggleKeyUpHandler}
      role="presentation"
    >
      {isPassword && (
        <div className="toggle-wrapper" onClick={toggleClickHandler} role="presentation">
          {isVisiblePassword ? (
            <HideIcon className="toggle-visibility" />
          ) : (
            <ShowIcon className="toggle-visibility" onClick={() => setIsVisiblePassword(true)} />
          )}
        </div>
      )}

      <input
        className={`c-form-input ${className}`}
        type={isVisiblePassword ? 'text' : type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        pattern={pattern}
        required={required}
      />
    </div>
  )
}

FormInput.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: () => {},
  value: '',
  className: '',
  autoComplete: null,
  required: false,
  pattern: null
}

FormInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  pattern: PropTypes.string
}

export default FormInput
