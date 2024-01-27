import axiosInstance from "./AxiosInstance";


export const createOrderRequest = (data) => {
  return axiosInstance.post(`/broker/createOrderRequest`, data);
};
