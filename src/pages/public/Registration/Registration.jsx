import { useEffect, useState } from 'react'
import api from '../../../api/api'
import { page } from '../../../utils/constants/system'
import { Brand, FormButton, FormDesc, FormTitle, Logo, NavLink } from '../../../components/_exports'
import { Step1, Step2, Step3, Step4 } from '../../../components/common/Registration/Steps/_exports'
import './Registration.scss'

function Registration() {
  const [registrationData, setRegistrationData] = useState({
    login: 'SiAvMaAnR',
    email: 'samarkin20022002@gmail.com',
    password: 'Sosnova61S',
    confirmationPassword: 'Sosnova61S'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [currentStepNumber, setCurrentStepNumber] = useState(0)
  const [isActiveBtn, setIsActiveBtn] = useState(true)
  const [isValid, setIsValid] = useState(true)
  const [result, setResult] = useState({
    isCompleted: false,
    isSuccess: false,
    message: ''
  })

  const { login, email, password, birthday } = registrationData

  const steps = [
    <Step1
      className="step"
      registrationData={registrationData}
      setRegistrationData={setRegistrationData}
      setIsValid={setIsValid}
    />,
    <Step2
      className="step"
      registrationData={registrationData}
      setRegistrationData={setRegistrationData}
      setIsValid={setIsValid}
    />,
    <Step3
      className="step"
      registrationData={registrationData}
      setRegistrationData={setRegistrationData}
      setIsValid={setIsValid}
    />,
    <Step4
      className="step"
      registrationData={registrationData}
      setRegistrationData={setRegistrationData}
      setIsValid={setIsValid}
    />
  ]

  useEffect(() => {
    setIsActiveBtn(isValid)
  }, [isValid])

  const registrationHandler = async () => {
    try {
      setIsLoading(true)
      const { data, response } = await api.user.registration({
        login,
        email,
        password,
        birthday
      })

      if (response?.data?.errors) {
        throw new Error('Validation error')
      }

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data?.isSuccess) {
        throw new Error('Something went wrong')
      }

      setResult({
        ...result,
        isCompleted: true,
        isSuccess: true,
        message: 'Further instructions have been sent to your email'
      })
    } catch (error) {
      setResult({
        ...result,
        isCompleted: true,
        isSuccess: false,
        message: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  const nextStepHandler = async () => {
    const nextStep = currentStepNumber + 1

    if (nextStep === steps.length) {
      await registrationHandler()
    } else {
      setCurrentStepNumber(nextStep)
    }
  }

  const keyDownHandler = async (event) => {
    if (event.key === 'Enter' && isActiveBtn) {
      await nextStepHandler()
    }
  }

  return (
    <div className="p-registration">
      <div className="registration-header">
        <div className="brand-wrapper">
          <Brand className="brand">Safe|Book</Brand>
        </div>
        <div className="sign-in-wrapper">
          <NavLink className="sign-in" link={page.login}>
            Sign In
          </NavLink>
        </div>
      </div>

      <div className="registration-content">
        <div className="registration-panel">
          <div className="description">
            <div className="title">Create your account</div>
            <div className="content">
              <p>Provides fast and instant messaging, making communication more efficient</p>
              <p>
                Аllows you to exchange not only text messages, but also photos, videos, documents
                and audio recordings
              </p>
              <p>
                Provides encryption features, providing an increased level of security for the
                exchange of personal information
              </p>
            </div>
          </div>
          {result.isCompleted ? (
            <div className="content result-content">
              <FormTitle className="status-text">
                {result.isSuccess ? 'Success' : 'Failed'}
              </FormTitle>

              <FormDesc className="reason">{result.message}</FormDesc>
            </div>
          ) : (
            <div className="content form-content">
              <div className="logo-wrapper">
                <Logo className="logo" />
              </div>
              <div className="inputs-wrapper" onKeyDown={keyDownHandler} role="presentation">
                {steps[currentStepNumber]}
              </div>
              <div className="button-wrapper">
                <FormButton
                  className="next-step-button"
                  isActive={isActiveBtn}
                  isLoading={isLoading}
                  onClick={nextStepHandler}
                >
                  Continue
                </FormButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Registration
