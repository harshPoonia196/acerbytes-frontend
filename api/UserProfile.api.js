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

export const getBrokers = (limit, page, search) => {
  return axiosInstance.get(
    `/user/brokers?limit=${limit || 10}&page=${page || 0}&search=${
      search || ""
    }`
  );
};
