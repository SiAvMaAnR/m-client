import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PermissionGuard from '../components/permission/PermissionGuard';

function AdminRoutes({ isLogged }) {
  return (
    <Route element={<PermissionGuard permittedRoles={['admin']} />}>
      <Route path="home" element={<Navigate to="/chat" />} />
    </Route>
  );
}

AdminRoutes.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default AdminRoutes;
