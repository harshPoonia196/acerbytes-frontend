import axiosInstance from "./AxiosInstance";


export const getAllProperty = (queryParams) => {
  return axiosInstance.get(`property/getProperties/` + (queryParams ? `?${queryParams}` : ''));
};


export const deleteProperty = (propertyId) => {
  return axiosInstance.delete(`property/delete/${propertyId}`)

};


export const detailsProperty = (detailsPropertyId) =>{
  return axiosInstance.get(`property/getProperty/${detailsPropertyId}`)
}


