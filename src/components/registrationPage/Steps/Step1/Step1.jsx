import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormDesc, FormInput, FormTitle } from '../../../_exports'
import { emailValidator } from '../../../../utils/validators/_exports'
import './Step1.scss'

function Step1({ className, setRegistrationData, registrationData, setIsValid }) {
  const [isValidEmail, setIsValidEmail] = useState(false)

  const { email } = registrationData

  useEffect(() => {
    setIsValid(isValidEmail)
  }, [isValidEmail, setIsValid])

  return (
    <div className={`c-registration-step ${className}`}>
      <FormTitle className="email-title">Enter your email</FormTitle>

      <FormDesc className="email-desc">Your email will be used to log into your account</FormDesc>

      <div className="inputs">
        <FormInput
          className="email-input"
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              email: e.target.value
            })
          }
          value={email}
          pattern=".+@.+\..+"
          validator={emailValidator}
          onValid={setIsValidEmail}
          required
        />
      </div>
    </div>
  )
}

Step1.defaultProps = {
  setRegistrationData: null,
  registrationData: null,
  className: '',
  setIsValid: null
}

Step1.propTypes = {
  setRegistrationData: PropTypes.func,
  registrationData: PropTypes.shape({
    email: PropTypes.string,
    login: PropTypes.string,
    password: PropTypes.string,
    birthday: PropTypes.string
  }),
  className: PropTypes.string,
  setIsValid: PropTypes.func
}

export default Step1
