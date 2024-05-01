import axiosInstance from "./AxiosInstance";

export const createOrderRequest = (data) => {
  return axiosInstance.post(`/broker/createOrderRequest`, data);
};

export const getBrokerBalance = () => {
  return axiosInstance.get(`/broker/paymentBalance`);
};

export const getAllBrokers = (limit, page, search) => {
  return axiosInstance.get(`/admin/allBrokerList`);
};

export const getPaymentHisotryList = () => {
  return axiosInstance.get(`/broker/paymentHistory`);
};

export const generateRandorOrderNumber = () => {
  return axiosInstance.get(`/broker/generateOrderNumber`);
};

export const getReviews = () => {
  return axiosInstance.get(`/broker/getReviewss`);
};

export const getBrokerLeads = ({ limit, page, search }) => {
  return axiosInstance.get(
    `/broker/myLeads?limit=${limit || ""}&&page=${page || 0}&&search=${
      search || ""
    }`
  );
};

export const getBrokerSuggestedLeads = ({ limit, page, search }) => {
  return axiosInstance.get(
    `/broker/suggestedLeads?limit=${limit || ""}&page=${page || 0}&search=${
      search || ""
    }`
  );
};
