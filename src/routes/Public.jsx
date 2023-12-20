import { Navigate, Route } from 'react-router-dom';
import { Login, Registration } from '../pages/exports';

const publicRoutes = (
  <Route>
    <Route path="*" element={<Navigate to="/login" />} />
    <Route path="login" element={<Login />} />
    <Route path="registration" element={<Registration />} />
  </Route>
);

export default publicRoutes;
