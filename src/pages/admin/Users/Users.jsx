import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import api from '../../../api/api'
import { page } from '../../../utils/constants/system'
import './Users.scss'

function Users() {
  const { logOut } = useAuth()
  const navigate = useNavigate()
  const refreshToken = localStorage.getItem('refreshToken')

  const logoutHandler = () => {
    api.account.revokeToken(refreshToken).then(() => {
      logOut()
      navigate(page.login)
    })
  }

  return (
    <div>
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  )
}

export default Users
