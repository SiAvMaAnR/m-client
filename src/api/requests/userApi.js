import axiosInstance from '../axios'

const path = '/api/user'

const userApi = {
  registration: async ({ email, login, password, birthday }) => {
    const body = { email, login, password, birthday }
    const response = await axiosInstance.post(`${path}/registration`, body)
    return response
  },

  confirmation: async ({ confirmation }) => {
    const body = { confirmation }
    const response = await axiosInstance.post(`${path}/confirmation`, body)
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
    const body = { id }
    const response = await axiosInstance.post(`${path}/block-user`, body)
    return response
  },

  unblockUser: async ({ id }) => {
    const body = { id }
    const response = await axiosInstance.post(`${path}/unblock-user`, body)
    return response
  }
}

export default userApi
