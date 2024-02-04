import axiosInstance from "./AxiosInstance";

export const getUserProfileByGoogleId = (googleID) => {
  return axiosInstance.get(`/user/userProfile/${googleID}`);
};


export const updateUserProfile = (googleID, data) => {
  return axiosInstance.post(`/user/userProfile/${googleID}`, data);
};

export const reviewBroker = (data) => {
  return axiosInstance.post(`/user/reviewBroker`, data);
};

export const getBrokers = () => {
  return axiosInstance.get(`/user/brokers`);
};
