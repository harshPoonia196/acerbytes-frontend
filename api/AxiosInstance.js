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
    if (error?.code === "ECONNABORTED") {
      showModal("Server is down. Please try again later."); 
    }
    if (error.response && error.response.status === 401) {
      logoutUser()
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
