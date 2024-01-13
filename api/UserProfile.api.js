import {
    GET_ACCESS_TOKEN,
  UNIVERSAL_ACCESS_TOKEN,
  UNIVERSAL_LIST_API,
} from "Components/config/config";
import axios from "axios";

class UserProfileModuleApi {
  constructor() {
    this.universal_list_api = UNIVERSAL_LIST_API;
    this.universal_access_token = UNIVERSAL_ACCESS_TOKEN;
    this.get_access_token_api = GET_ACCESS_TOKEN

  }


  getAccessToken() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${this.get_access_token_api}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-token':
            this.universal_access_token,
          'user-email': 'patidarjitendra973@gmail.com',
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
  }

  getAllStateList = (access_token) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: `${this.universal_list_api}states/India`,
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

  getAllCitiesList(access_token, name) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${this.universal_list_api}cities/` + name,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + access_token,
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
  }
  
}
export default UserProfileModuleApi;
