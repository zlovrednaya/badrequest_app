import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthProvider } from "../../auth/AuthContext";

import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import ChoresTrackerAccount from "./ChoresTrackerAccount";
import UserProfile from "./user/UserProfile";

import ProtectedRoute from "../../components/ProtectedRoute";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import './ChoresTrackerForm.css';

export default function ChoresTracker({widget, onClose}) {    
    const title = "Chores";
    const appName = "chores";

    return (
        <AuthProvider>
            <div className="ChoresTrackerForm fixed inset-0 flex items-center justify-center bg-black/40">            
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginForm title={title} appName={appName} />}></Route>
                        <Route path="/register" element={<RegisterForm title={title} appName={appName}/>}></Route>
                        <Route path="/account" element={<ProtectedRoute><ChoresTrackerAccount/></ProtectedRoute>}></Route>
                        <Route path="/account-edit" element={<ProtectedRoute><UserProfile/></ProtectedRoute>}></Route>
                    </Routes>
                </Router>
                <div className="gap-2 close-btn-container rounded-xl absolute">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded cursor-pointer close-btn"
                >
                </button>
                </div>
                
            </div>
        </AuthProvider>
    );
};