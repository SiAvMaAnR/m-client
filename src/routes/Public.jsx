import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PermissionGuard from '../components/permission/PermissionGuard';

function PublicRoutes({ isLogged }) {
  return (
    <Route element={<PermissionGuard permittedRoles={[]} />}>
      <Route path="*" element={<Navigate to="/chat" />} />
    </Route>
  );
}

PublicRoutes.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default PublicRoutes;
