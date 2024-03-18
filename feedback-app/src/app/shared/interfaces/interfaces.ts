import { Role } from "@constants/roles";

export interface LockedReasonInterface {
    id: number,
    name: string ,
}

export interface MenuInterface {
    title: string,
    component: JSX.Element,
    icon: any,
    path: string,
    allowedRoles: Role[] | "*"[],
    childMenu?: MenuInterface[]
}