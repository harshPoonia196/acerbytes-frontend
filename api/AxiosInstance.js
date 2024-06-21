import axios from "axios";
import { showModal } from "utills/ServerDownContext";
import { getToken, logoutUser } from "utills/utills";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error?.code)
    if (error?.code === "ECONNABORTED" || error?.code === "ERR_CONNECTION_REFUSED") {
      showModal(); 
    }
    if (error.response && error.response.status === 401) {
      logoutUser()
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
