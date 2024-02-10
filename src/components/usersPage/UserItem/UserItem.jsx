import PropTypes from 'prop-types'
import './UserItem.scss'

function UserItem({ className, userInfo }) {
  return (
    <div className={`c-user-item ${className}`}>
      <div>{userInfo.id}</div>
      <div>{userInfo.login}</div>
      <div>{userInfo.email}</div>
      <div>{userInfo.role}</div>
      <div>{userInfo.image}</div>
      <div>{userInfo.birthday}</div>
    </div>
  )
}

UserItem.defaultProps = {
  className: '',
  userInfo: null
}

UserItem.propTypes = {
  className: PropTypes.string,
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    birthday: PropTypes.string
  })
}

export default UserItem
