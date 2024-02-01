
import axiosInstance from "./AxiosInstance";

export const CreateProperty = (payload) => {
  return axiosInstance.post(`/property/create`,payload);
};

export const getAllProperty = () => {
  return axiosInstance.get("property/getProperties")
};


export const deleteProperty = (propertyId) => {
  return axiosInstance.delete(`property/delete/${propertyId}`)

};



