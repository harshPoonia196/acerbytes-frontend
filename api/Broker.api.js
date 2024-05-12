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
  return axiosInstance.get(`/broker/getReviews`);
};

export const getBrokerLeads = ({ limit, page, search }) => {
  return axiosInstance.get(
    `/broker/myLeads?limit=${limit || ""}&&page=${page || 0}&&search=${
      search || ""
    }`
  );
};

export const getMyLeadsCustomer = () => {
  return axiosInstance.get(
    `/broker/myLeadsCustomer`
  );
};

export const createNote = (data) => {
  return axiosInstance.post(`/broker/addNote`, data);
};

export const deleteNote = (noteId) => {
  return axiosInstance.delete(`/broker/deleteNote/${noteId}`);
}

export const getNotes = ({ search, alignment }) => {
  return axiosInstance.get(
    `/broker/getNotes?search=${search || ""}&alignment=${alignment}`
  );
};

export const getBrokerSuggestedLeads = ({ limit, page, search }) => {
  return axiosInstance.get(
    `/broker/suggestedLeads?limit=${limit || ""}&page=${page || 0}&search=${
      search || ""
    }`
  );
};

export const buySuggestedLeads = (data) => {
  return axiosInstance.put(
    "/broker/leadBrokerUpdate", data
  );
};

export const buyNotesPoints = (data) => {
  return axiosInstance.put(`/broker/buyNotesPoints`, data);
};
