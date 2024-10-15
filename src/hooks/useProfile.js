import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../api/api'
import { updateInfo, clearInfo } from '../redux/slices/userSlice'

const useProfile = () => {
  const dispatch = useDispatch()
  const { isLogged } = useSelector((state) => state.auth.info)

  useEffect(() => {
    if (isLogged) {
      api.account.profile().then((result) => {
        const { login, email, role, birthday } = result.data || {}
        dispatch(updateInfo({ login, email, role, birthday }))
      })

      api.account.image().then((result) => {
        dispatch(updateInfo({ image: result.data?.image }))
      })
    } else {
      dispatch(
        clearInfo({
          login: null,
          email: null,
          role: null,
          birthday: null
        })
      )
    }
  }, [isLogged, dispatch])
}

export default useProfile
