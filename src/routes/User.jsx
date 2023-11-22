import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PermissionGuard from '../components/permission/PermissionGuard';

function UserRoutes({ isLogged }) {
  return (
    <Route element={<PermissionGuard roles={['user']} />}>
      <Route path="*" element={<Navigate to="/chat" />} />
    </Route>
  );
}

UserRoutes.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default UserRoutes;
