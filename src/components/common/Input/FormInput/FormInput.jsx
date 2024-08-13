import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ShowIcon from './ShowIcon/ShowIcon'
import HideIcon from './HideIcon/HideIcon'
import ToolTip1 from '../../ToolTip/ToolTip1/ToolTip1'
import ValidIcon from './ValidIcon/ValidIcon'
import './FormInput.scss'

function FormInput({
  placeholder = '',
  type = 'text',
  autoComplete = null,
  onChange = () => {},
  value = '',
  className = '',
  required = false,
  isPassword = false,
  validator = null,
  onValid = () => {},
  pattern = null
}) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const validClass = isValid ? 'valid' : 'invalid'

  useEffect(() => {
    if (validator && value) {
      const { valid, error } = validator(value)
      setIsValid(valid)
      setErrorMessage(error)
    } else {
      setIsValid(true)
    }
  }, [value, setIsValid, validator])

  useEffect(() => {
    onValid(!!value && isValid)
  }, [isValid, onValid, value])

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
      className={`c-form-input ${validClass}`}
      onKeyDown={toggleKeyDownHandler}
      onKeyUp={toggleKeyUpHandler}
      role="presentation"
    >
      {isPassword && (
        <div className="toggle-wrapper" onClick={toggleClickHandler} role="presentation">
          {isVisiblePassword ? (
            <HideIcon className="toggle-visibility" />
          ) : (
            <ShowIcon className="toggle-visibility" />
          )}
        </div>
      )}

      {!isValid && (
        <div className="valid-wrapper">
          <ToolTip1 text={errorMessage}>
            <ValidIcon />
          </ToolTip1>
        </div>
      )}

      <input
        className={`form-input ${className}`}
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

FormInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  pattern: PropTypes.string,
  isPassword: PropTypes.bool,
  validator: PropTypes.func,
  onValid: PropTypes.func
}

export default FormInput
