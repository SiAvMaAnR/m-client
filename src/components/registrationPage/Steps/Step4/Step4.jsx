import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { DateInput, FormDesc, FormTitle } from '../../../_exports'
import './Step4.scss'

function Step4({ className, setRegistrationData, registrationData, setIsValid }) {
  const [value, setValue] = useState(null)

  const { birthday } = registrationData

  useEffect(() => {
    if (value !== birthday) {
      setRegistrationData({
        ...registrationData,
        birthday: value
      })
    }
  }, [value, setRegistrationData, registrationData, birthday])

  return (
    <div className={`c-registration-step ${className}`}>
      <FormTitle className="birthday-title">Enter your birthday</FormTitle>

      <FormDesc className="birthday-desc">
        Your birthday will be used to log into your account
      </FormDesc>

      <div className="inputs">
        <DateInput
          className="birthday-input"
          setValue={setValue}
          onValid={setIsValid}
          value={birthday}
        />
      </div>
    </div>
  )
}

Step4.defaultProps = {
  setRegistrationData: null,
  registrationData: null,
  className: '',
  setIsValid: null
}

Step4.propTypes = {
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

export default Step4
