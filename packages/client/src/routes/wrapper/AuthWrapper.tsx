import { ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";

export const AuthWrapper = ({ component }: { component: ReactElement }) => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        return (
            <Navigate to="/login" replace={true} />
        )
    }
    return (
        <>
            {component}
        </>
    )
}
