import { useSelector } from 'react-redux'
import { roles } from '../utils/constants/auth'

const useRole = () => {
  const role = useSelector((state) => state.auth.info.role)
  return role?.toLowerCase() || roles.public
}

export default useRole
