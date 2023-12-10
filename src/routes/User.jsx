import { Route } from 'react-router-dom';
import PermissionGuard from '../components/permission/PermissionGuard';
import Users from '../pages/Admin/Users/Users';

function UserRoutes() {
  return (
    <Route element={<PermissionGuard permittedRoles={['user']} />}>
      <Route path="*" element={<Users />} />
    </Route>
  );
}

export default UserRoutes;
