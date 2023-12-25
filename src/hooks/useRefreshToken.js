import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useAuth from './useAuth'
import api from '../api/api'

const useRefreshToken = () => {
  const { updateAccessToken, logOut } = useAuth()
  const accessTokenExp = useSelector((state) => state.auth.info.accessTokenExp)
  const refreshTokenExp = useSelector((state) => state.auth.info.refreshTokenExp)
  const refreshToken = localStorage.getItem('refreshToken')
  const navigate = useNavigate()

  useEffect(() => {
    const leftTime = accessTokenExp - Date.now()

    const verifyTokenTimeout = setTimeout(() => {
      if (refreshTokenExp > Date.now()) {
        api.account.refreshToken(refreshToken).then((result) => {
          updateAccessToken(result)
        })
      } else {
        logOut()
        navigate('/login')
      }
    }, leftTime)

    return () => clearTimeout(verifyTokenTimeout)
  }, [accessTokenExp, updateAccessToken, logOut, navigate, refreshToken, refreshTokenExp])
}

export default useRefreshToken
