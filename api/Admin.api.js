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

  if (limit >= 0) {
    query += `limit=${limit || 0}&&`;
  }
  if (page >= 0) {
    query += `page=${page || 0}&&`;
  }
  if (search) {
    query += `search=${search || ""}&&`;
  }
  return axiosInstance.get(`/admin/brokerList?${query}`);
};

export const getLeads = ({ limit, page, search }) => {
  return axiosInstance.get(
    `/admin/getLeads?limit=${limit || ""}&&page=${page || 0}&&search=${search || ""
    }`
  );
};

export const getCreditPointStatusList = (queryParams) => {
  return axiosInstance.get(`/admin/creditPointStatus?${queryParams}`);
};
