import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { role, page } from '../constants/system'
import {
  Chat,
  ConfirmedRegistration,
  Home,
  Login,
  Profile,
  Registration,
  Users,
  ResetPassword,
  InitResetPassword,
  AIProfiles,
  Settings
} from '../pages/_exports'
import { RoutePermissionGuard, SidebarLayout } from '../components/_exports'

function AppRouter() {
  const isLogged = useSelector((state) => state.auth.info.isLogged)

  return <div className="app-router">{isLogged ? <LoggedRouter /> : <GuestRouter />}</div>
}

function LoggedRouter() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={page.chat} />} />

      <Route element={<RoutePermissionGuard permittedRoles={[role.admin]} />}>
        <Route path="users" element={<SidebarLayout page={<Users />} />} />
      </Route>

      <Route element={<RoutePermissionGuard permittedRoles={[role.user, role.admin]} />}>
        <Route path="home" element={<SidebarLayout page={<Home />} />} />
        <Route path="chat/:id?" element={<SidebarLayout page={<Chat />} />} />
        <Route path="ai-profiles" element={<SidebarLayout page={<AIProfiles />} />} />
        <Route path="profile" element={<SidebarLayout page={<Profile />} />} />
        <Route path="settings" element={<SidebarLayout page={<Settings />} />} />
      </Route>
    </Routes>
  )
}

function GuestRouter() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={page.login} />} />

      <Route element={<RoutePermissionGuard permittedRoles={[role.public]} />}>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="confirm-registration" element={<ConfirmedRegistration />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="init-reset-password" element={<InitResetPassword />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
