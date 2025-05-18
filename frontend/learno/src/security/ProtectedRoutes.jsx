import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" replace />;

    const decoded = jwtDecode(token);
    const userRole = decoded?.role?.toUpperCase();

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet/>;
}

export default ProtectedRoutes
