import { AuthenticationInterface } from "@modules/login/login.interface";
import {
  getAccessToken,
  getLoginInfo,
  setLoginInfo,
} from "./local-storage.helper";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";

export const isCurrentUserAuthenticated = () => {
  const loginInfo = getLoginInfo();
  return loginInfo !== null && !isTokenExpired();
};

export const isOrganizationLinkedToUser = () => {
  const decodedToken: any = getDecodedToken();
  if (decodedToken) {
    return decodedToken.user_scope !== undefined;
  }
  return false;
};

export const isUserPartOfOrganization = () => {
  const decodedToken: any = getDecodedToken();
  if (decodedToken) {
    return decodedToken.is_scope_enable;
  }
  return false;
};


export const getCurrentUserId = () => {
  const decodedToken: any = getDecodedToken();
  if (decodedToken) {
    return decodedToken.user_validity;
  }
  return -1;
};

export const getCurrentUserName = () => {
  const userData = getLoginInfo()?.user_data;
  return userData.firstName + " " + userData.lastName;
}

export const getCurrentUserEmail = () => {
  const decodedToken: any = getDecodedToken();
  if (decodedToken) {
    return decodedToken.email;
  }
  return null;
}


export const getCurrentUserRole = () => {
  const loginInfo = getLoginInfo();
  return loginInfo.user_data.role;
};

export const isTokenExpired = () => {
  const decodedToken: any = getDecodedToken();
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTimestamp
}


const getDecodedToken = () => {
  const accessToken = getAccessToken();
  return jwtDecode(accessToken);
};


export const isCurrentUserAdmin = () => {
  const role = getCurrentUserRole();
  return role === "ADMIN";
}

export const isCurrentUserCustomer = () => {
  const role = getCurrentUserRole();
  return role === "CUSTOMER";
}