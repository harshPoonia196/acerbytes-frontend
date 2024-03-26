import axiosInstance from "./AxiosInstance";


export const getAllActiveAd = (queryParams) => {
    return axiosInstance.get(
      `/activeAd/getAll` + (queryParams ? `?${queryParams}` : "")
    );
  };
  