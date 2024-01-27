import axiosInstance from "./AxiosInstance";


export const getOrderRequests = (queryParams) => {
  return axiosInstance.get(`/admin/orderRequests?${queryParams}`);
};

export const completeOrderRequest = (payload) => {
  return axiosInstance.post(`/admin/completeOrderRequests`, payload);
};