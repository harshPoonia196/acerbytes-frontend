import axiosInstance from "./AxiosInstance";

export const getBrokerProfile = (userId) => {
  return axiosInstance.get(`/broker/brokerProfile/${userId}`);
};

export const updateBrokerProfile = ({userId, data }) => {
  return axiosInstance.post(`/broker/brokerProfile/${userId}`, data);
};
