import { Role } from "@constants/roles";


export interface RegistrationRequestInterface {
  firstName: string,
  lastName: string,
  emailId: string,
  mobileNumber: string,
  password: string,
  role: Role
}