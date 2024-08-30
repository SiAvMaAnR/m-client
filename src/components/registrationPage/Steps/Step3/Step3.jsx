import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormDesc, FormInput, FormTitle } from '../../../_exports'
import { passwordValidator, cPasswordValidator } from '../../../../utils/validators/_exports'
import './Step3.scss'

function Step3({
  className = '',
  setRegistrationData = null,
  registrationData = null,
  setIsValid = () => {}
}) {
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [isValidCPassword, setIsValidCPassword] = useState(false)

  const { password, confirmationPassword } = registrationData

  useEffect(() => {
    setIsValid(isValidPassword && isValidCPassword)
  }, [isValidPassword, isValidCPassword, setIsValid])

  return (
    <div className={`c-registration-step ${className}`}>
      <FormTitle className="password-title">Enter your password</FormTitle>

      <FormDesc className="password-desc">
        Your password will be used to log into your account
      </FormDesc>

      <div className="inputs">
        <FormInput
          className="password-input"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              password: e.target.value
            })
          }
          value={password}
          validator={passwordValidator}
          onValid={setIsValidPassword}
          isPassword
          required
        />

        <FormInput
          className="confirmation-password-input"
          type="password"
          placeholder="Confirmation password"
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              confirmationPassword: e.target.value
            })
          }
          value={confirmationPassword}
          validator={(cPassword) => cPasswordValidator(password, cPassword)}
          onValid={setIsValidCPassword}
          required
        />
      </div>
    </div>
  )
}

Step3.propTypes = {
  setRegistrationData: PropTypes.func,
  registrationData: PropTypes.shape({
    email: PropTypes.string,
    login: PropTypes.string,
    password: PropTypes.string,
    confirmationPassword: PropTypes.string,
    birthday: PropTypes.string
  }),
  className: PropTypes.string,
  setIsValid: PropTypes.func
}

export default Step3
