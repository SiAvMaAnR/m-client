import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { page } from '../constants/system'
import useAuth from './useAuth'
import api from '../api/api'
import { getAuthTokens } from '../utils/helpers/tokenHelper'

const reserveTime = 1000

const useRefreshToken = () => {
  const { updateAccessToken, logOut } = useAuth()
  const { accessTokenExp, refreshTokenExp, isLogged } = useSelector((state) => state.auth.info)
  const { accessToken, refreshToken } = getAuthTokens()
  const navigate = useNavigate()

  const refreshTokenHandler = useCallback(() => {
    if (refreshTokenExp > Date.now()) {
      api.auth
        .refreshToken({ refreshToken })
        .then((result) => {
          const token = result.data?.accessToken

          if (!token) {
            throw new Error('Wrong token')
          }

          updateAccessToken({
            accessToken: token
          })
        })
        .catch(() => {
          logOut()
          navigate(page.login)
        })
    } else {
      api.auth.revokeToken({ refreshToken }).finally(() => {
        logOut()
        navigate(page.login)
      })
    }
  }, [logOut, navigate, refreshToken, refreshTokenExp, updateAccessToken])

  useEffect(() => {
    const leftTime = accessTokenExp - Date.now() - reserveTime

    const verifyTokenTimeout = isLogged ? setTimeout(refreshTokenHandler, leftTime) : null

    return () => clearTimeout(verifyTokenTimeout)
  }, [isLogged, accessTokenExp, refreshTokenHandler])

  useEffect(() => {
    if (isLogged && !accessToken) {
      logOut()
      navigate(page.login)
    }
  }, [accessToken, logOut, navigate, isLogged])
}

export default useRefreshToken
