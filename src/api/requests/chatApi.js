import { services } from '../../constants/system'
import axiosInstance from '../axios'

const path = `/api/${services.chat}/chat`

const chatApi = {
  sendMessage: async ({ message }) => {
    const response = await axiosInstance.post(`${path}/send-message`, {
      message
    })
    return response
  },

  messages: async ({ channelId, pageNumber, pageSize, skip, searchField }) => {
    const params = [
      `channelId=${channelId}`,
      `searchField=${searchField || ''}`,
      `pagination.pageNumber=${pageNumber || 0}`,
      `pagination.pageSize=${pageSize || 100}`,
      `pagination.skip=${skip || 0}`
    ]

    const response = await axiosInstance.get(`${path}/messages?${params.join('&')}`)
    return response
  }
}

export default chatApi
