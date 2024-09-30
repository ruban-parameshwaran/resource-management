import { RootState } from "@src/app/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  
    const token = useSelector((state: RootState) => state.user.token);

    // return token ? <Outlet /> : <Navigate to={'/login'} replace={true} />

    return  token ? children: <Navigate to="/login" replace={true} />

}

export default ProtectedRoute;