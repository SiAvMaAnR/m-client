import { Route, Navigate } from 'react-router-dom';
import PermissionGuard from '../components/permission/PermissionGuard';

function CustomRoutes() {
  return (
    <Route element={<PermissionGuard permittedRoles={['admin', 'user']} />}>
      <Route path="*" element={<Navigate to="/chat" />} />
    </Route>
  );
}

export default CustomRoutes;
