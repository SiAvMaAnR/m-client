import { useNavigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import useRole from '../../hooks/useRole';

function PermissionGuard({ permittedRoles }) {
  const navigate = useNavigate();
  const userRole = useRole();

  const isAccess = permittedRoles.includes(userRole);

  return isAccess ? <Outlet /> : navigate('/login');
}

PermissionGuard.propTypes = {
  permittedRoles: PropTypes.string.isRequired,
};

export default PermissionGuard;
