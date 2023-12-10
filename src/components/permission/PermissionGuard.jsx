import { useNavigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import useRole from '../../hooks/useRole';

function PermissionGuard({ permittedRoles }) {
  const navigate = useNavigate();
  const userRole = useRole();

  console.log('userRole', userRole);

  const isAccess = permittedRoles.includes(userRole);

  console.log('isAccess', isAccess);

  return isAccess ? <Outlet /> : navigate('/login');
}

PermissionGuard.propTypes = {
  permittedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PermissionGuard;
