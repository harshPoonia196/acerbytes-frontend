import axios from "axios";
import axiosInstance from "./AxiosInstance";
const UNIVERSAL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_UNIVERSAL_ACCESS_TOKEN;
const UNIVERSAL_LIST_API = process.env.NEXT_PUBLIC_UNIVERSAL_LIST_API;
const GET_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GET_ACCESS_TOKEN;

export const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${GET_ACCESS_TOKEN}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token":
          "wf9Su-BHch6J2SrbMm0EpgawFYxmADFvUmNRoPhC3VbipDy0nDiBFNS7ZDhBCrsNa1k",
        "user-email": "patidarjitendra973@gmail.com",
      },
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getAllCountriesList = (access_token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${UNIVERSAL_LIST_API}countries/`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getAllStateList = (access_token, stateName) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${UNIVERSAL_LIST_API}states/` + stateName,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getAllCitiesList = (access_token, name) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${UNIVERSAL_LIST_API}cities/` + name,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getEnquiries = () => {
  return axiosInstance.get(`/higheruser/getLeads`);
};


export const uploadImage = (data) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}general/upload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProfileImage = (id, imageUrl) => {
  return axiosInstance.post(`/higheruser/updateProfile/${id}`, {
    imageUrl
  });
};
