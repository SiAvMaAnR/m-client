import { services } from '../../constants/system'
import axiosInstance from '../axios'

const path = `/api/${services.chat}/channel`

const channelApi = {
  createDirect: async ({ accountId }) => {
    const response = await axiosInstance.post(`${path}/create-direct`, {
      accountId
    })
    return response
  },

  createPublic: async ({ name, members }) => {
    const response = await axiosInstance.post(`${path}/create-public`, {
      name,
      members
    })
    return response
  },

  createPrivate: async ({ name, members }) => {
    const response = await axiosInstance.post(`${path}/create-private`, {
      name,
      members
    })
    return response
  },

  connect: async ({ channelId }) => {
    const response = await axiosInstance.post(`${path}/connect`, {
      channelId
    })
    return response
  },

  accountChannels: async ({ pageNumber, pageSize, searchField, channelType }) => {
    const params = [
      `pagination.pageNumber=${pageNumber || 0}`,
      `pagination.pageSize=${pageSize || 100}`,
      `searchField=${searchField || ''}`,
      `channelType=${channelType || ''}`
    ]

    const response = await axiosInstance.get(`${path}/account-channels?${params.join('&')}`)
    return response
  },

  accountChannel: async ({ id }) => {
    const response = await axiosInstance.get(`${path}/account-channels/${id}`)
    return response
  },

  setUpDirectChannel: async ({ partnerId }) => {
    const response = await axiosInstance.post(`${path}/setup-direct`, {
      partnerId
    })
    return response
  },

  memberImages: async ({ channelId }) => {
    const params = [`channelId=${channelId}`]

    const response = await axiosInstance.get(`${path}/member-images?${params.join('&')}`)
    return response
  }
}

export default channelApi
