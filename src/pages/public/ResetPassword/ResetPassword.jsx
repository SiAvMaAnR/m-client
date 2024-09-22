import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Brand, FormButton, FormInput, Logo, NavLink } from '../../../components/_exports'
import { page } from '../../../constants/system'
import api from '../../../api/api'
import cPasswordValidator from '../../../utils/validators/cPasswordValidator'
import passwordValidator from '../../../utils/validators/passwordValidator'
import RedirectModal from '../../../components/common/Modal/RedirectModal/RedirectModal'
import './ResetPassword.scss'

const defaultClientMessage = 'Enter your new password'
const redirectModalDelay = 3

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [message, setMessage] = useState(defaultClientMessage)
  const [isLoading, setIsLoading] = useState(false)
  const [isActiveBtn, setIsActiveBtn] = useState(false)
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [isValidCPassword, setIsValidCPassword] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const resetToken = searchParams.get('token')

  useEffect(() => {
    const isActive = resetToken && isValidPassword && isValidCPassword

    setMessage(defaultClientMessage)
    setIsActiveBtn(!!isActive)
  }, [resetToken, isValidPassword, isValidCPassword])

  const resetPasswordHandler = async () => {
    try {
      setIsLoading(true)

      const { data, response } = await api.auth.resetPassword({
        resetToken,
        password
      })

      if (response?.data?.errors) {
        throw new Error('Validation error')
      }

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data) {
        throw new Error('Something went wrong')
      }

      setIsCompleted(true)
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
      resetPasswordHandler()
    }
  }

  return (
    <div className="p-reset-password">
      <RedirectModal
        isActive={isCompleted}
        link={page.login}
        delay={redirectModalDelay}
        title="Success"
        message="Redirect to login page"
      />

      <div className="reset-password-header">
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

          <div className="title">Reset password</div>

          <div className="client-message">{message}</div>

          <form className="form" onSubmit={(e) => submitHandler(e)}>
            <div className="inputs-wrapper">
              <FormInput
                className="password-input"
                type="password"
                placeholder="New password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                validator={passwordValidator}
                onValid={setIsValidPassword}
                required
                isPassword
              />

              <FormInput
                className="password-input"
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setConfirmationPassword(e.target.value)}
                value={confirmationPassword}
                validator={(cPassword) => cPasswordValidator(password, cPassword)}
                onValid={setIsValidCPassword}
                required
              />
            </div>

            <div className="button-wrapper">
              <FormButton
                className="submit-button"
                isActive={isActiveBtn}
                isLoading={isLoading}
                onClick={resetPasswordHandler}
              >
                Reset password
              </FormButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
