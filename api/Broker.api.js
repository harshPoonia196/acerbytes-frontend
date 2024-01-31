import axiosInstance from "./AxiosInstance";


export const createOrderRequest = (data) => {
  return axiosInstance.post(`/broker/createOrderRequest`, data);
};

export const getBrokerBalance = () => {
  return axiosInstance.get(`/broker/paymentBalance`);
};

export const getPaymentHisotryList = () => {
  return axiosInstance.get(`/broker/paymentHistory`);
};

export const generateRandorOrderNumber = () => {
  return axiosInstance.get(`/broker/generateOrderNumber`);
};
