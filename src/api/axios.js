import axios from 'axios'
import configuration from '../config/configuration'

const appConfig = configuration.app

const axiosInstance = axios.create({
  baseURL: appConfig.url,
  timeout: appConfig.timeout
})

const getAccessToken = () => localStorage.getItem('accessToken')

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  const { headers = {} } = config

  config.headers = {
    ...headers,
    Authorization: `Bearer ${accessToken}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => error
)

export default axiosInstance
