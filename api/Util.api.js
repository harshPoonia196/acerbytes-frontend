import {
  GET_ACCESS_TOKEN,
  UNIVERSAL_ACCESS_TOKEN,
  UNIVERSAL_LIST_API,
} from "Components/config/config";
import axios from "axios";

export const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${GET_ACCESS_TOKEN}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": UNIVERSAL_ACCESS_TOKEN,
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
