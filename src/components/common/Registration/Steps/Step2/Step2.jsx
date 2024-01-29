import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormDesc, FormInput, FormTitle } from '../../../../_exports'
import { loginValidator } from '../../../../../utils/validators/_exports'
import './Step2.scss'

function Step2({ className, setRegistrationData, registrationData, setIsValid }) {
  const [isValidLogin, setIsValidLogin] = useState(false)

  const { login } = registrationData

  useEffect(() => {
    setIsValid(isValidLogin)
  }, [isValidLogin, setIsValid])

  return (
    <div className={`c-registration-step ${className}`}>
      <FormTitle className="login-title">Enter your login</FormTitle>

      <FormDesc className="login-desc">Your login will be used to identify your account</FormDesc>

      <div className="inputs">
        <FormInput
          className="login-input"
          type="login"
          placeholder="Login"
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              login: e.target.value
            })
          }
          value={login}
          validator={loginValidator}
          onValid={setIsValidLogin}
          required
        />
      </div>
    </div>
  )
}

Step2.defaultProps = {
  setRegistrationData: null,
  registrationData: null,
  className: '',
  setIsValid: null
}

Step2.propTypes = {
  setRegistrationData: PropTypes.func,
  registrationData: PropTypes.shape({
    email: PropTypes.string,
    login: PropTypes.string,
    password: PropTypes.string,
    birthday: PropTypes.instanceOf(Date)
  }),
  className: PropTypes.string,
  setIsValid: PropTypes.func
}

export default Step2
