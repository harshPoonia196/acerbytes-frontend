import axios from "axios";
const UNIVERSAL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_UNIVERSAL_ACCESS_TOKEN;
const UNIVERSAL_LIST_API = process.env.NEXT_PUBLIC_UNIVERSAL_LIST_API;
const GET_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GET_ACCESS_TOKEN;


const LOCAL_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



export const getAllProperty = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${LOCAL_URL}property/getProperties/`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};


export const deleteProperty = (propertyId) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "delete",
        url: `${LOCAL_URL}property/delete/${propertyId}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  };
  


