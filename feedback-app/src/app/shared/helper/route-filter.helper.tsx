import { Navigate } from "react-router-dom";
import { getCurrentUserRole, isCurrentUserAuthenticated } from "@shared/helper/authentication.helper";

export const PrivateRoute = ({ children, allowedRoles }: any) => {
  if (isCurrentUserAuthenticated() && (allowedRoles.includes(getCurrentUserRole()) || allowedRoles.includes("*"))) {
    return children;
  }
  return <Navigate to="/login" replace />
}

export const SidebarRouteFilter = ({ children, allowedRoles }: any) => {
  if (isCurrentUserAuthenticated() && (allowedRoles.includes(getCurrentUserRole()) || allowedRoles.includes("*"))) {
    return children;
  }
  return null;
}