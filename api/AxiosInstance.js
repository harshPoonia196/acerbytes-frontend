import axios from 'axios';
import { getToken, logoutUser } from 'utills/utills';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${getToken()}`
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logoutUser()
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
