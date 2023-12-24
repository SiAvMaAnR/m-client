import { Navigate, Route, Routes } from 'react-router-dom'
import { roles } from '../utils/constants/auth'
import { Chat, Home, Login, Profile, Registration, Users } from '../pages/_exports'
import { PermissionGuard, SidebarLayout } from '../components/_exports'

function AppRouter() {
  return (
    <div className="app-router">
      <Routes>
        <Route element={<PermissionGuard permittedRoles={[roles.public]} />}>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>

        <Route element={<PermissionGuard permittedRoles={[roles.admin]} />}>
          <Route path="users" element={<SidebarLayout page={<Users />} />} />
        </Route>

        <Route element={<PermissionGuard permittedRoles={[roles.user]} />}>
          <Route path="profile" element={<SidebarLayout page={<Profile />} />} />
        </Route>

        <Route element={<PermissionGuard permittedRoles={[roles.user, roles.admin]} />}>
          <Route path="home" element={<SidebarLayout page={<Home />} />} />
          <Route path="chat" element={<SidebarLayout page={<Chat />} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRouter
