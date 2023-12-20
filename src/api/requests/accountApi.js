import axiosInstance from '../axios';

const accountApi = {
  login: async (email, password) => {
    const response = await axiosInstance.post(`/api/account/login`, { email, password });
    return response.data;
  },
};

export default accountApi;
