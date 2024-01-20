import axiosInstance from "./AxiosInstance";

export const getBrokerProfile = (openSnackbar) => {
  return axiosInstance
    .get(`/broker/brokerProfile`)
    .then((res) => {
      const { success, data, message } = res.data;
      if (success) {
        return data;
      } else {
        openSnackbar(message, "error");
      }
    })
    .catch((error) => {
      openSnackbar(error?.response?.data?.message || error?.message || "Something went wrong!", "error");
      return error;
    });
};

export const updateBrokerProfile = (data) => {
  return axiosInstance.post(`/broker/brokerProfile`, data);
};
