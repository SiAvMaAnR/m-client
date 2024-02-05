import axiosInstance from '../axios'

const path = '/api/admin'

const adminApi = {
  profile: async () => {
    const response = await axiosInstance.get(`${path}/profile`)
    return response
  }
}

export default adminApi
