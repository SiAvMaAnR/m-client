import { services } from '../../constants/system'
import axiosInstance from '../axios'

const path = `/api/${services.auth}/auth`

const authApi = {
  login: async ({ email, password }) => {
    const body = { email, password }

    const response = await axiosInstance.post(`${path}/login`, body)
    return response
  },

  refreshToken: async ({ refreshToken }) => {
    const body = { refreshToken }
    const response = await axiosInstance.post(`${path}/refresh-token`, body)
    return response
  },

  revokeToken: async ({ refreshToken }) => {
    const body = { refreshToken }
    const response = await axiosInstance.post(`${path}/revoke-token`, body)
    return response
  },

  resetToken: async ({ email }) => {
    const body = { email }
    const response = await axiosInstance.post(`${path}/reset-token`, body)
    return response
  },

  resetPassword: async ({ resetToken, password }) => {
    const body = { resetToken, password }
    const response = await axiosInstance.post(`${path}/reset-password`, body)
    return response
  }
}

export default authApi
