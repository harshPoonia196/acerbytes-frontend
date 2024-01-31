
import axiosInstance from "./AxiosInstance";

export const CreateProperty = (payload) => {
  return axiosInstance.post(`/property/create`,payload);
};

