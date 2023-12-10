import { Route } from 'react-router-dom';
import PermissionGuard from '../components/permission/PermissionGuard';
import { Login } from '../pages/exports';

function PublicRoutes() {
  return (
    <Route>
      <Route path="/login" element={<Login />} />
    </Route>
  );
}

export default PublicRoutes;
