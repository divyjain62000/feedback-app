import { postAPI } from "../../shared/api/api";
import { RegistrationRequestInterface } from "./registration.interface";


export const registrationAPI = (registrationData: RegistrationRequestInterface) => {
  return postAPI("/api/auth/v1/register", registrationData, false);
};