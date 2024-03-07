import accountApi from './requests/accountApi'
import authApi from './requests/authApi'
import adminApi from './requests/adminApi'
import userApi from './requests/userApi'
import channelApi from './requests/channelApi'
import chatApi from './requests/chatApi'

const api = {
  auth: authApi,
  account: accountApi,
  user: userApi,
  admin: adminApi,
  channel: channelApi,
  chat: chatApi
}

export default api
