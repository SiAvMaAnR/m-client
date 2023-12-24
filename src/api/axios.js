import axios from 'axios'
import configuration from '../config/configuration'

const appConfig = configuration.app

const token = localStorage.getItem('token')

const axiosInstance = axios.create({
  baseURL: appConfig.url,
  timeout: appConfig.timeout,
})

axiosInstance.interceptors.request.use((config) => {
  const { headers = {} } = config

  config.headers = {
    ...headers,
    Authorization: `Bearer ${token}`,
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => error,
)

export default axiosInstance
