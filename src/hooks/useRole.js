import { useSelector } from 'react-redux'
import { role } from '../constants/system'

const useRole = () => {
  const currentRole = useSelector((state) => state.auth.info.role)
  return currentRole?.toLowerCase() || role.public
}

export default useRole
