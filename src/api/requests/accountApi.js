import axiosInstance from '../axios'

const path = '/api/account'

const accountApi = {
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
  },

  image: async () => {
    const response = await axiosInstance.get(`${path}/image`)
    return response
  },

  uploadImage: async ({ file }) => {
    const body = { file }
    const response = await axiosInstance.post(`${path}/upload-image`, body)
    return response
  }
}

export default accountApi
