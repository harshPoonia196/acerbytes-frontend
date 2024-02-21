import axiosInstance from "./AxiosInstance";


export const getOrderRequests = (queryParams) => {
  return axiosInstance.get(`/admin/orderRequests?${queryParams}`);
};

export const completeOrderRequest = (payload) => {
  return axiosInstance.post(`/admin/completeOrderRequests`, payload);
};

export const getSalesPersons = () => {
  return axiosInstance.get(`/higheruser/salesPersons`);
};

export const getConsultantsPersons = () => {
  return axiosInstance.get(`/higheruser/consultantsList`);
};

export const getBrokersList = (limit, page, search) => {
  let query = "";
  if (limit) {
    query += `limit=${limit || 0}&&`;
  }
  if (page) {
    query += `page=${page || 0}&&`;
  }
  if (search) {
    query += `search=${search || ""}&&`;
  }
  return axiosInstance.get(`/admin/brokerList?${query}`);
};

export const getCreditPointStatusList = (queryParams) => {
  return axiosInstance.get(`/admin/creditPointStatus?${queryParams}`);
};