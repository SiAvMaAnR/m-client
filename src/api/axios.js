import axios from 'axios';
import configuration from '../../config/appConfig';

const appConfig = configuration.app;

const axiosInstance = axios.create({
  baseURL: appConfig?.url ?? 5050,
  timeout: appConfig?.timeout ?? 2000,
});

axiosInstance.interceptors.request.use(
  (config) => ({
    ...(config.headers || {}),
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  })
);

export default axiosInstance;
