import axiosInstance from '../axios'

const path = '/api/chat'

const chatApi = {
  sendMessage: async ({ message }) => {
    const body = { message }
    const response = await axiosInstance.post(`${path}/send-message`, body)
    return response
  },

  channels: async () => {
    const response = await axiosInstance.get(`${path}/channels`)
    return response
  }
}

export default chatApi
