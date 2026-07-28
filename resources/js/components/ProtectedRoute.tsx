import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = localStorage.getItem('token');
    if(!token) {
        return (
            <Navigate to="/" replace />
        )
    }
    
    return children;
}