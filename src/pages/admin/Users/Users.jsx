import useAuth from '../../../hooks/useAuth'
import './Users.scss'

function Users() {
  const { logOut } = useAuth()

  const logoutHandler = () => {
    logOut()
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
