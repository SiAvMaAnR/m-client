import PropTypes from 'prop-types'
import useRole from '../../hooks/useRole'

function ComponentPermissionGuard({ permittedRoles, children = null }) {
  const userRole = useRole()
  const isAccess = permittedRoles.includes(userRole)
  return isAccess ? children : null
}

ComponentPermissionGuard.propTypes = {
  permittedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.element
}

export default ComponentPermissionGuard
