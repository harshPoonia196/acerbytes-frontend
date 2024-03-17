
import axiosInstance from "./AxiosInstance";

export const signInAPI = (type) => {
  return axiosInstance.get(`/higheruser/signIn?type=${type}`);
};

export const signInAuthenticationAPI = (payload) => {
  return axiosInstance.post(`/higheruser/signInAuthentication`, payload);
};

export const sendOtpAPI = (payload) => {
  return axiosInstance.post(`/higheruser/sendOtp`, payload);
};

export const verifyOtpAPI = (payload) => {
  return axiosInstance.post(`/higheruser/verifyOtp`, payload);
};

export const createUserAPI = (payload) => {
  return axiosInstance.post(`/higheruser/create`, payload);
};
