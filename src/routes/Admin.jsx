import { Navigate, Route } from 'react-router-dom';
import PermissionGuard from '../components/permission/PermissionGuard';
import { Users } from '../pages/exports';

const adminRoutes = (
  <Route element={<PermissionGuard permittedRoles={['admin']} />}>
    <Route path="*" element={<Navigate to="/users" />} />
    <Route path="users" element={<Users />} />
  </Route>
);

export default adminRoutes;
