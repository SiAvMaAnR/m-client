import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loader1 from '../../../components/common/Loader/Loader1/Loader1'
import { Brand, FormButton, Logo, NavLink } from '../../../components/_exports'
import { page } from '../../../constants/system'
import api from '../../../api/api'
import { useAuth } from '../../../hooks/_exports'
import './ConfirmedRegistration.scss'

function ConfirmedRegistration() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { logIn } = useAuth()
  const [message, setMessage] = useState('')
  const [authData, setAuthData] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const confirmAsync = useCallback(async () => {
    try {
      setIsLoading(true)

      const code = searchParams.get('code')

      if (!code) {
        throw new Error('Code is not exists')
      }

      const { data, response } = await api.user.confirmation({ confirmation: code })

      if (response?.data?.errors) {
        throw new Error('Validation error')
      }

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data?.accessToken || !data?.refreshToken) {
        throw new Error('Something went wrong')
      }

      setIsSuccess(true)
      setAuthData(data)
      setMessage('Sign up successfully completed')
    } catch (error) {
      setIsSuccess(false)
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [searchParams])

  const continueHandler = () => {
    logIn(authData)
    navigate(page.home)
  }

  const againHandler = () => {
    navigate(page.registration)
  }

  useEffect(() => {
    confirmAsync()
  }, [confirmAsync])

  return (
    <div className="p-confirm-registration">
      <div className="confirm-registration-header">
        <div className="brand-wrapper">
          <Brand className="brand">M|7|R</Brand>
        </div>
        <div className="sign-in-wrapper">
          <NavLink className="sign-in" link={page.login}>
            Sign In
          </NavLink>
        </div>
      </div>

      <div className="confirm-registration-content">
        <div className="confirm-registration-panel">
          {isLoading ? (
            <Loader1 className="loader" />
          ) : (
            <>
              <div className="logo-wrapper">
                <Logo className="logo" />
              </div>

              <div className="title">{isSuccess ? 'Success' : 'Failure'}</div>

              <div className="message">{message}</div>

              <div className="button-wrapper">
                <FormButton
                  className="login-button"
                  onClick={isSuccess ? continueHandler : againHandler}
                >
                  {isSuccess ? 'Continue' : 'Again'}
                </FormButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConfirmedRegistration
