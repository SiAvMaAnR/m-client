import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import Error from '../../pages/common/Error/Error'
import useRole from '../../hooks/useRole'

function RoutePermissionGuard({ permittedRoles }) {
  const userRole = useRole()
  const isAccess = permittedRoles.includes(userRole)
  
  return isAccess ? <Outlet /> : <Error />
}

RoutePermissionGuard.propTypes = {
  permittedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default RoutePermissionGuard
