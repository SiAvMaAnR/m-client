import { useEffect, useState } from 'react'
import { Brand, FormButton, FormInput, Logo, NavLink } from '../../../components/_exports'
import { page } from '../../../constants/system'
import api from '../../../api/api'
import emailValidator from '../../../utils/validators/emailValidator'
import './InitResetPassword.scss'

const defaultClientMessage = 'Enter your email'
const resendTiming = 30

function InitResetPassword() {
  const [message, setMessage] = useState(defaultClientMessage)
  const [isLoading, setIsLoading] = useState(false)
  const [isActiveBtn, setIsActiveBtn] = useState(false)
  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const isActiveButton = isValidEmail && timer === 0

    setIsActiveBtn(isActiveButton)
  }, [isValidEmail, timer])

  useEffect(() => {
    setMessage(defaultClientMessage)
  }, [email])

  useEffect(() => {
    let interval

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else {
      setIsActiveBtn(true)
    }

    return () => clearInterval(interval)
  }, [timer])

  const initResetPasswordHandler = async () => {
    try {
      setIsLoading(true)

      const { data, response } = await api.auth.resetToken({
        email
      })

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data || response?.data?.errors) {
        throw new Error('Something went wrong')
      }

      setIsSuccess(true)
      setTimer(resendTiming)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const submitHandler = (event) => {
    event.preventDefault()
  }

  const submitKeyDownHandler = (event) => {
    if (event.key === 'Enter') {
      initResetPasswordHandler()
    }
  }

  return (
    <div className="p-init-reset-password">
      <div className="init-reset-password-header">
        <div className="brand-wrapper">
          <Brand className="brand">M|7|R</Brand>
        </div>
        <div className="sign-in-wrapper">
          <NavLink className="sign-in" link={page.login}>
            Sign In
          </NavLink>
        </div>
      </div>

      <div className="reset-password-content">
        <div className="reset-password-panel" onKeyDown={submitKeyDownHandler} role="presentation">
          <div className="logo-wrapper">
            <Logo className="logo" />
          </div>

          <div className="title">{isSuccess ? 'Success' : 'Forgot password?'}</div>

          <div className="client-message">
            {isSuccess ? 'A reset link has been sent to your email address' : message}
          </div>

          <form className="form" onSubmit={(e) => submitHandler(e)}>
            <div className="inputs-wrapper">
              {!isSuccess && (
                <FormInput
                  className="email-input"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  validator={emailValidator}
                  onValid={setIsValidEmail}
                  required
                />
              )}
            </div>

            {isSuccess && !!timer && (
              <div className="button-timeout-wrapper">
                <div className="button-timeout">
                  <p>{`Didn't receive a message?`}</p>
                  <p>
                    Try again in <b>{timer}</b> seconds
                  </p>
                </div>
              </div>
            )}

            <div className="button-wrapper">
              <FormButton
                className="submit-button"
                isActive={isActiveBtn}
                isLoading={isLoading}
                onClick={initResetPasswordHandler}
              >
                Send reset link
              </FormButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InitResetPassword
