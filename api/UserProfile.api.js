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

  return axiosInstance.get(`/user/consultants?${query}`);
};

export const submitEnquiry = (data) => {
  console.log("Data: ", data);
  let userDetail = getLoggedInUser();
  return axiosInstance.post(`/user/enquiry`, {
    propertyId: data?.propertyId || null,
    adId: data?.adId,
    name: { firstName: data?.firstName, lastName: data?.lastName },
    phone: { countryCode: data?.countryCode, number: `${data?.number}` },
    adId: data?.adId,
    propertyLink: data?.propertyLink,
    brokerId: data?.brokerId,
    // userId: userDetail?._id,
  });
};

export const submitEnquiryUnauth = (data) => {
  console.log("Data: ", data);
  return axiosInstance.post(`/user/enquiryUnauth`, {
    propertyId: data?.propertyId || null,
    adId: data?.adId,
    name: { firstName: data?.firstName, lastName: data?.lastName },
    phone: { countryCode: data?.countryCode, number: `${data?.number}` },
    otp: data?.otp,
    propertyLink: data?.propertyLink
  });
};

export const updateEnquiryVerified = (data) => {
  return axiosInstance.post(`/user/enquiryVerify`, {
    ...data
  });
};


export const updateEnquiryVerifiedByUserId = (data) => {
  return axiosInstance.post(`/user/enquiryVerifyByUserId`, {
    ...data
  });
};


export const isEnquired = (adId, propertyId) => {
  return axiosInstance.post(`/user/isEnquired`, {
    adId: adId || "",
    propertyId: propertyId || "",
  });
};
