import accountApi from './requests/accountApi'
import adminApi from './requests/adminApi'
import userApi from './requests/userApi'

const api = {
  account: accountApi,
  user: userApi,
  admin: adminApi
}

export default api
