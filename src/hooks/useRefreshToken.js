import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { page } from '../utils/constants/system'
import useAuth from './useAuth'
import api from '../api/api'

const useRefreshToken = () => {
  const { updateAccessToken, logOut } = useAuth()
  const accessTokenExp = useSelector((state) => state.auth.info.accessTokenExp)
  const refreshTokenExp = useSelector((state) => state.auth.info.refreshTokenExp)
  const isLogged = useSelector((state) => state.auth.info.isLogged)
  const refreshToken = localStorage.getItem('refreshToken')
  const navigate = useNavigate()

  useEffect(() => {
    const leftTime = accessTokenExp - Date.now()

    const verifyTokenTimeout = setTimeout(() => {
      if (!isLogged) {
        return
      }

      if (refreshTokenExp > Date.now()) {
        api.account.refreshToken({ refreshToken }).then((result) => {
          updateAccessToken(result)
        })
      } else {
        api.account.revokeToken({ refreshToken }).then(() => {
          logOut()
          navigate(page.login)
        })
      }
    }, leftTime)

    return () => clearTimeout(verifyTokenTimeout)
  }, [accessTokenExp, refreshToken, refreshTokenExp, isLogged, updateAccessToken, logOut, navigate])
}

export default useRefreshToken
