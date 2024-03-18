import { getAPI, postAPI } from "../../shared/api/api";
import { AuthenticationInterface } from "./login.interface";

export const authenticateAPI = (authenticationData: AuthenticationInterface) => {
  return postAPI("/api/auth/v1/login", authenticationData, false);
};

export const logoutAPI = () => {
  return getAPI("/v1/logout");
};
