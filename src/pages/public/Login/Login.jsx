import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import api from '../../../api/api'
import './Login.scss'

function Login() {
  const navigate = useNavigate()
  const { logIn } = useAuth()
  const [loginData, setLoginData] = useState({ email: 'admin@admin.com', password: 'Sosnova61S' })
  const [errorMessage, setErrorMessage] = useState('')

  const { email, password } = loginData

  useEffect(() => {
    setErrorMessage('')
  }, [loginData])

  const loginHandler = () => {
    api.account
      .login(email, password)
      .then((result) => logIn(result))
      .then(() => navigate('/home'))
      .catch((error) => {
        const clientMessage = error.response?.data?.clientMessage ?? 'Unknown error'
        setErrorMessage(clientMessage)
      })
  }

  return (
    <div>
      <div>{email}</div>
      <div>{password}</div>
      <div>{errorMessage}</div>

      <input
        placeholder="email"
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        value={email}
      />
      <input
        placeholder="password"
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        value={password}
      />

      <button type="button" onClick={loginHandler}>
        Login
      </button>
    </div>
  )
}

export default Login
