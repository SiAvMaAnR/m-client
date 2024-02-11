import accountApi from './requests/accountApi'
import authApi from './requests/authApi'
import adminApi from './requests/adminApi'
import userApi from './requests/userApi'

const api = {
  auth: authApi,
  account: accountApi,
  user: userApi,
  admin: adminApi
}

export default api
