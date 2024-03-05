import { getLoggedInUser } from "utills/utills";
import axiosInstance from "./AxiosInstance";

export const getUserProfileByGoogleId = (googleID) => {
  return axiosInstance.get(`/user/userProfile/${googleID}`);
};

export const updateUserProfile = (googleID, data) => {
  return axiosInstance.post(`/user/userProfile/${googleID}`, data);
};

export const reviewBroker = (data) => {
  return axiosInstance.post(`/user/reviewBroker`, data);
};

export const getBrokers = (limit, page, search) => {
  
  return axiosInstance.get(`/admin/brokerList`)
};

export const submitEnquiry = (data) => {
  let userDetail = getLoggedInUser();
  return axiosInstance.post(`/user/enquiry`, {
    propertyId: data?.propertyId || null,
    adId: data?.adId,
    name: { firstName: data?.firstName, lastName: data?.lastName },
    phone: { countryCode: data?.countryCode, number: `${data?.number}` },
    userId: userDetail?._id,
  });
};

export const isEnquired = (adId, propertyId) => {
  return axiosInstance.post(`/user/isEnquired`, {
    adId: adId || "",
    propertyId: propertyId || "",
  });
};
