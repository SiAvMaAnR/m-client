import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PermissionGuard from '../components/permission/PermissionGuard';

function AdminRoutes({ isLogged }) {
  return (
    <Route element={<PermissionGuard roles={['admin']} />}>
      <Route path="home" element={<Navigate to="/chat" />} />
    </Route>
  );
}

AdminRoutes.propTypes = {
  isLogged: PropTypes.string.isRequired,
};

export default AdminRoutes;
