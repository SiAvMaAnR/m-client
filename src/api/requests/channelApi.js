import axiosInstance from '../axios'

const path = '/api/channel'

const channelApi = {
  createDirect: async ({ accountId }) => {
    const body = { accountId }
    const response = await axiosInstance.post(`${path}/create-direct`, body)
    return response
  },

  createPublic: async ({ name }) => {
    const body = { name }
    const response = await axiosInstance.post(`${path}/create-public`, body)
    return response
  },

  createPrivate: async ({ name }) => {
    const body = { name }
    const response = await axiosInstance.post(`${path}/create-private`, body)
    return response
  },

  connect: async ({ channelId }) => {
    const body = { channelId }
    const response = await axiosInstance.post(`${path}/connect`, body)
    return response
  }
}

export default channelApi
