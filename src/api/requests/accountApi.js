import { services } from '../../constants/system'
import axiosInstance from '../axios'

const path = `/api/${services.chat}/account`

const accountApi = {
  profile: async () => {
    const response = await axiosInstance.get(`${path}/profile`)
    return response
  },

  image: async () => {
    const response = await axiosInstance.get(`${path}/image`)
    return response
  },

  uploadImage: async ({ image }) => {
    const response = await axiosInstance.post(`${path}/upload-image`, { image })
    return response
  },

  accounts: async ({ pageNumber, pageSize, isLoadImage, searchField }) => {
    const params = [
      `pagination.pageNumber=${pageNumber || 0}`,
      `pagination.pageSize=${pageSize || 100}`,
      `isLoadImage=${isLoadImage || false}`,
      `searchField=${searchField}`
    ]

    const response = await axiosInstance.get(`${path}/accounts?${params.join('&')}`)
    return response
  },

  accountById: async ({ id }) => {
    const response = await axiosInstance.get(`${path}/accounts/${id}`)
    return response
  },

  imageByAccountId: async ({ id }) => {
    const response = await axiosInstance.get(`${path}/accounts/${id}/image`)
    return response
  },
}

export default accountApi
