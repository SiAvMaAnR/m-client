import { Route, Navigate } from 'react-router-dom';
import PermissionGuard from '../components/permission/PermissionGuard';

const customRoutes = (
  <Route element={<PermissionGuard permittedRoles={['admin', 'user']} />}>
    <Route path="chat" element={<Navigate to="/chat" />} />
  </Route>
);

export default customRoutes;
