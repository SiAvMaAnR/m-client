import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import useAuth from './useAuth'

const useTokenTimeout = () => {
  const { logOut } = useAuth()
  const accessTokenExp = useSelector((state) => state.auth.info.accessTokenExp)
  const navigate = useNavigate()

  useEffect(() => {
    const leftTime = accessTokenExp - Date.now()

    const verifyTokenTimeout = setTimeout(() => {
      logOut()
      navigate('/login')
    }, leftTime)

    return () => clearTimeout(verifyTokenTimeout)
  }, [accessTokenExp, logOut, navigate])
}

export default useTokenTimeout
