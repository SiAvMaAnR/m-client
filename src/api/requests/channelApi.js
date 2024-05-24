import axiosInstance from '../axios'

const path = '/api/channel'

const channelApi = {
  createDirect: async ({ accountId }) => {
    const body = { accountId }
    const response = await axiosInstance.post(`${path}/create-direct`, body)
    return response
  },

  createPublic: async ({ name, members }) => {
    const body = { name, members }
    const response = await axiosInstance.post(`${path}/create-public`, body)
    return response
  },

  createPrivate: async ({ name, members }) => {
    const body = { name, members }
    const response = await axiosInstance.post(`${path}/create-private`, body)
    return response
  },

  connect: async ({ channelId }) => {
    const body = { channelId }
    const response = await axiosInstance.post(`${path}/connect`, body)
    return response
  },

  accountChannels: async ({ pageNumber, pageSize, searchField }) => {
    const params = [
      `pagination.pageNumber=${pageNumber || 0}`,
      `pagination.pageSize=${pageSize || 100}`,
      `searchField=${searchField || ''}`
    ]

    const response = await axiosInstance.get(`${path}/account-channels?${params.join('&')}`)
    return response
  }
}

export default channelApi
