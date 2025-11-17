import { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuth";
import { Navigate } from "react-router-dom";

export const AdminRequireAuth = ({ children }) => {
    return children;
}