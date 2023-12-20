import { Route } from 'react-router-dom';
import PermissionGuard from '../components/permission/PermissionGuard';

const userRoutes = (
  <Route element={<PermissionGuard permittedRoles={['user']} />}>
    {/* <Route path="*" element={<Users />} /> */}
  </Route>
);

export default userRoutes;
