import axios from "axios";
import { getAccessToken } from "@shared/helper/local-storage.helper";


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 10000,
});


export const getAPI = (
  api: string,
  requestData: any = {},
  isAccessTokenRequired: boolean = true
) => {
  let requestConfig = {
    ...requestData,
  };

  if (isAccessTokenRequired) {
    requestConfig = {
      ...requestConfig,
      headers: {
        Authorization: getAccessToken(),
      },
    };
  }

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(api, requestConfig)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


export const postAPI = (
  api: string,
  requestData: any,
  isAccessTokenRequired: boolean = true
) => {
  axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
  if (isAccessTokenRequired) {
    axiosInstance.defaults.headers.common["Authorization"] = getAccessToken();
  }
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(api, requestData)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};



export const putAPI = (
  api: string,
  requestData: any,
  isAccessTokenRequired: boolean = true
) => {
  axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
  if (isAccessTokenRequired) {
    axiosInstance.defaults.headers.common["Authorization"] = getAccessToken();
  }
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(api, requestData)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


axiosInstance.interceptors.response.use(
  (response) => {
    const status = response.status;
    let responseData = null;
    switch (status) {
      case 200:
        responseData = response.data;
        break;
      case 201:
        responseData = response.data;
        break;
      default:
        break;
    }
    return responseData;
  },
  (error) => {
    if (error.request) {
      const status = error.request.status;
      switch (status) {
        case 0:
          console.log("We are facing issue"); //later on need to show either page or modal
          return window.location.href = "/serverdown";
        default:
          break;
      }
    }
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        const customException = error.response.data;
        return Promise.reject(customException);
      } else if (status === 401 || status === 403) {
        return window.location.href = "/login";
      } else if (status === 500) {
        return window.location.href="/error";
      }
    }
  }
);
