import axiosInstance from "./AxiosInstance";

export const getBrokerProfile = () => {
  return axiosInstance.get(`/broker/brokerProfile`);
};

export const updateBrokerProfile = (data) => {
  return axiosInstance.post(`/broker/brokerProfile`, data);
};
