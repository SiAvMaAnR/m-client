import { services } from '../../constants/system'
import axiosInstance from '../axios'

const path = `/api/${services.auth}/auth`

const authApi = {
  login: async ({ email, password }) => {
    const response = await axiosInstance.post(`${path}/login`, {
      email,
      password
    })
    return response
  },

  refreshToken: async ({ refreshToken }) => {
    const response = await axiosInstance.post(`${path}/refresh-token`, { refreshToken })
    return response
  },

  revokeToken: async ({ refreshToken }) => {
    const response = await axiosInstance.post(`${path}/revoke-token`, { refreshToken })
    return response
  },

  resetToken: async ({ email }) => {
    const response = await axiosInstance.post(`${path}/reset-token`, { email })
    return response
  },

  resetPassword: async ({ resetToken, password }) => {
    const response = await axiosInstance.post(`${path}/reset-password`, {
      resetToken,
      password
    })
    return response
  }
}

export default authApi
