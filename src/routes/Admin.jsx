import { Route, Navigate } from 'react-router-dom';
import PermissionGuard from '../components/permission/PermissionGuard';

function AdminRoutes() {
  return (
    <Route element={<PermissionGuard permittedRoles={['admin']} />}>
      <Route path="users" element={<Navigate to="/users" />} />
    </Route>
  );
}

export default AdminRoutes;
