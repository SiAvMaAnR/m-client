import { services } from '../../constants/system'
import axiosInstance from '../axios'

const path = `/api/${services.ai}/profiles`

const aiProfileApi = {
  create: async ({ apiKey, additionalKey, temperature, template, model, name }) => {
    const response = await axiosInstance.post(`${path}`, {
      apiKey,
      additionalKey,
      temperature,
      template,
      model,
      name
    })
    return response
  },

  get: async ({ id }) => {
    const response = await axiosInstance.get(`${path}/${id}`)
    return response
  },

  getAll: async ({ pageNumber, pageSize, searchField = '' }) => {
    const params = [
      `pageNumber=${pageNumber || 0}`,
      `pageSize=${pageSize || 100}`,
      `searchField=${searchField}`
    ]

    const response = await axiosInstance.get(`${path}?${params.join('&')}`)
    return response
  },

  delete: async ({ id }) => {
    const response = await axiosInstance.delete(`${path}/${id}`)
    return response
  },

  update: async ({ id, apiKey, additionalKey, temperature, template, model, name }) => {
    const response = await axiosInstance.put(`${path}/${id}`, {
      apiKey,
      additionalKey,
      temperature,
      template,
      model,
      name
    })
    return response
  }
}

export default aiProfileApi
