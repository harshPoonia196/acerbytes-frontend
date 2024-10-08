import axiosInstance from "./AxiosInstance";

export const CreateProperty = (payload) => {
  return axiosInstance.post(`/property/create`, payload);
};

export const getAllProperty = (queryParams) => {
  return axiosInstance.get(
    `property/getProperties` + (queryParams ? `?${queryParams}` : "")
  );
};
export const getAllAdminProperty = (queryParams) => {
  return axiosInstance.get(
    `/property/admin/getProperties` + (queryParams ? `?${queryParams}` : "")
  );
};

export const getAllPropertyByAdmin = (queryParams) => {
  return axiosInstance.get(
    `property/admin/getProperties` + (queryParams ? `?${queryParams}` : "")
  );
};

export const getCities = () => {
  return axiosInstance.get(`category/get-cities`);
};

export const deleteProperty = (propertyId) => {
  return axiosInstance.delete(`property/delete/${propertyId}`);
};

export const detailsProperty = (detailsPropertyId) => {
  return axiosInstance.get(`property/getProperty/${detailsPropertyId}`);
};

export const activeAdGet = (activeAdGetById) => {
  return axiosInstance.get(`activeAd/${activeAdGetById}`);
};

export const activeadCreate = (data) => {
  return axiosInstance.post(`/activead/create`, data);
};

export const checkEnquiryOnActiveLink = (id) => {
  return axiosInstance.get(`/activead/checkEnquiryOnActiveLink/${id}`);
};

export const checkEnquiryOnPropertyLink = (id) => {
  return axiosInstance.get(`/activead/checkEnquiryOnPropertyLink/${id}`);
};

export const EditProperty = (detailsPropertyId, data) => {
  return axiosInstance.put(`/property/update/${detailsPropertyId}`, data);
};
export const favPropertyCreate = (data) => {
  return axiosInstance.post(`/favProperty/create`, data);
};

export const getAllfavouriteProperty = (queryParams) => {
  return axiosInstance.get(
    `/favProperty/getAll` + (queryParams ? `?${queryParams}` : "")
  );
};

export const getAllOptionData = (data) => {
  return axiosInstance.get(`/property/get-option-list`, data);
};

export const getAllOptions = () => {
  return axiosInstance.get("/category/get-all-options");
};

export const getLocations = () => {
  return axiosInstance.get(`/category/get-locations`);
};

export const propertyByCity = () => {
  return axiosInstance.get(`/category/propertyByCity`);
};

export const managePublishData = (propertyId, publishStatus) => {
  return axiosInstance.put(
    `/property/managePublish/${propertyId}/${publishStatus}`
  );
};

export const getBrokersList = (search, city = "all") => {
  let query = `search=${search || ""}&&`;

  if (city != "all") {
    query += `city=${city}&&`;
  }

  return axiosInstance.get(`/property/brokerList${query ? "?" + query : ""}`);
};

export const getBrokerCityList = () => {
  return axiosInstance.get(`/property/broker-cities`);
};

export const getReviews = (id) => {
  return axiosInstance.get(`/property/getReviews?brokerId=${id}`);
};

export const PropertyPlanPoints = (detailsPropertyId, data) => {
  return axiosInstance.put(
    `/property/consultant-update/${detailsPropertyId}`,
    data
  );
};

export const activedViewCount = (id) => {
  return axiosInstance.get(`/activeAd/viewCount/${id}`);
};
