import axiosInstance from "./AxiosInstance";

export const getUsersList = (queryParams) => {
  return axiosInstance.get(`/higheruser/usersList?${queryParams}`);
};

export const updateUserRole = (payload) => {
  return axiosInstance.post(`/higheruser/update/userRole`, payload);
};

export const updateUserStatus = (payload) => {
  return axiosInstance.post(`/higheruser/update/userStatus`, payload);
};
