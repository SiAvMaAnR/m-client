import axios from 'axios';
import config from '../config/config';

const axiosInstance = axios.create({
    baseURL: config?.app?.url ?? 5050,
    timeout: config?.app?.timeout ?? 2000
});

axiosInstance.interceptors.request.use((config) => {
    const {
        headers = {}
    } = config

    config.headers = {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    return config;
}, (error) => {
    console.error(error);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.error(error);
    return Promise.reject(error);
});

export default axiosInstance;