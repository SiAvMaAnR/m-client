import axiosInstance from '../axios'

const path = '/api/admin'

const adminApi = {
  profile: async () => {
    const response = await axiosInstance.get(`${path}/profile`)
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
  }
}

export default adminApi
