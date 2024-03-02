import axiosInstance from "./AxiosInstance";

export const CreateProperty = (payload) => {
  return axiosInstance.post(`/property/create`, payload);
};

export const getAllProperty = (queryParams) => {
  return axiosInstance.get(
    `property/getProperties` + (queryParams ? `?${queryParams}` : "")
  );
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

export const getAllOptionData= (data) => {
  return axiosInstance.get(`/property/get-option-list`, data);
};
export const getLocations = ()=>{
  return axiosInstance.get(`/category/get-locations`)
}

