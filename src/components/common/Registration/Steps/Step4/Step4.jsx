import PropTypes from 'prop-types'
import { DateInput, FormDesc, FormTitle } from '../../../../_exports'
import './Step4.scss'

function Step4({ className, setRegistrationData, registrationData, setIsValid }) {
  const { birthday } = registrationData

  return (
    <div className={`c-registration-step ${className}`}>
      <FormTitle className="birthday-title">Enter your birthday</FormTitle>

      <FormDesc className="birthday-desc">
        Your birthday will be used to log into your account
      </FormDesc>

      <div className="inputs">
        <DateInput
          className="birthday-input"
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              birthday: e.target.value
            })
          }
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
    birthday: PropTypes.instanceOf(Date)
  }),
  className: PropTypes.string,
  setIsValid: PropTypes.func
}

export default Step4
