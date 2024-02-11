import axios from 'axios'
import configuration from '../config/configuration'
import { getAuthTokens } from '../utils/helpers/tokenHelper'

const serverConfig = configuration.server

const axiosInstance = axios.create({
  baseURL: serverConfig.url,
  timeout: serverConfig.timeout
})

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = getAuthTokens()
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
