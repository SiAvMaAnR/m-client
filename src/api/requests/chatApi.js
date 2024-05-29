import axiosInstance from '../axios'

const path = '/api/chat'

const chatApi = {
  sendMessage: async ({ message }) => {
    const body = { message }
    const response = await axiosInstance.post(`${path}/send-message`, body)
    return response
  },

  messages: async ({ channelId, pageNumber, pageSize, searchField }) => {
    const params = [
      `channelId=${channelId}`,
      `searchField=${searchField || ''}`,
      `pagination.pageNumber=${pageNumber || 0}`,
      `pagination.pageSize=${pageSize || 100}`
    ]

    const response = await axiosInstance.get(`${path}/messages?${params.join('&')}`)
    return response
  }
}

export default chatApi
