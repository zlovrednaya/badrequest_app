import React,{ useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
    const {user, login, logout} = useContext(AuthContext);
    return {user, login, logout};
};