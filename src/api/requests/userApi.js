import { services } from '../../constants/system'
import axiosInstance from '../axios'

const path = `/api/${services.chat}/user`

const userApi = {
  registration: async ({ email, login, password, birthday }) => {
    const response = await axiosInstance.post(`${path}/registration`, {
      email,
      login,
      password,
      birthday
    })
    return response
  },

  confirmation: async ({ confirmation }) => {
    const response = await axiosInstance.post(`${path}/confirmation`, {
      confirmation
    })
    return response
  },

  users: async ({ pageNumber, pageSize, isLoadImage }) => {
    const params = [
      `pagination.pageNumber=${pageNumber || 0}`,
      `pagination.pageSize=${pageSize || 100}`,
      `isLoadImage=${isLoadImage || false}`
    ]

    const response = await axiosInstance.get(`${path}/users?${params.join('&')}`)
    return response
  },

  blockUser: async ({ id }) => {
    const response = await axiosInstance.post(`${path}/block-user`, { id })
    return response
  },

  unblockUser: async ({ id }) => {
    const response = await axiosInstance.post(`${path}/unblock-user`, { id })
    return response
  }
}

export default userApi
