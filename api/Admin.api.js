import axiosInstance from "./AxiosInstance";


export const getOrderRequests = (queryParams) => {
  return axiosInstance.get(`/admin/orderRequests?${queryParams}`);
};

export const completeOrderRequest = (payload) => {
  return axiosInstance.post(`/admin/completeOrderRequests`, payload);
};

export const getSalesPersons = () => {
  return axiosInstance.get(`/higheruser/salesPersons`);
};

export const getConsultantsPersons = () => {
  return axiosInstance.get(`/higheruser/consultantsList`);
};