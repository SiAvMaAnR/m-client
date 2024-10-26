import { services } from '../../constants/system'
import axiosInstance from '../axios'

const path = `/api/${services.ai}/profiles`

const aiProfileApi = {
  create: async ({ apiKey, temperature, model }) => {
    const response = await axiosInstance.post(`${path}`, {
      apiKey,
      temperature,
      model
    })
    return response
  },

  get: async ({ id }) => {
    const response = await axiosInstance.get(`${path}/${id}`)
    return response
  },

  getAll: async ({ pageNumber, pageSize }) => {
    const params = [`pageNumber=${pageNumber || 0}`, `pageSize=${pageSize || 100}`]

    const response = await axiosInstance.get(`${path}?${params.join('&')}`)
    return response
  },

  delete: async ({ id }) => {
    const response = await axiosInstance.delete(`${path}/${id}`)
    return response
  }
}

export default aiProfileApi
