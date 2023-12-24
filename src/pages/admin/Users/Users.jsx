import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import './Users.scss'

function Users() {
  const { logOut } = useAuth()
  const navigate = useNavigate()

  const logoutHandler = () => {
    logOut()
    navigate('/login')
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
