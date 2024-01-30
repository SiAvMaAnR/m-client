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
  }
}

export default userApi
