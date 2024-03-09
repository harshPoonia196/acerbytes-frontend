import axiosInstanceForFormData from "./AxiosInstance";

export const imageUpload = (data) => {

    const formData = new FormData();
    formData.append('image', data.image);

  return axiosInstanceForFormData.post(`/general/upload`, formData);
};