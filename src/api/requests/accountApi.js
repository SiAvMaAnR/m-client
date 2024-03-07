import axiosInstance from '../axios'

const path = '/api/account'

const accountApi = {
  image: async () => {
    const response = await axiosInstance.get(`${path}/image`)
    return response
  },

  uploadImage: async ({ file }) => {
    const body = { file }
    const response = await axiosInstance.post(`${path}/upload-image`, body)
    return response
  }
}

export default accountApi
