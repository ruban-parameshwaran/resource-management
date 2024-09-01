import { ReactNode } from "react";

export interface IMenuItems  {
    id? : number;
    name: string;
    icon?: ReactNode;
    path?: any;
    children?: Array<IMenuItems>;
}