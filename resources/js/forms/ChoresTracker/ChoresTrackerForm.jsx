import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import ChoresTrackerAccount from "./ChoresTrackerAccount";

import ProtectedRoute from "../../components/ProtectedRoute";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import './ChoresTrackerForm.css';

export default function ChoresTracker() {
  //  const navigate = useNavigate();
    const title = "Chores";

    return (
        <div className="ChoresTrackerForm fixed inset-0 flex items-center justify-center bg-black/40">            
            <Router>
                <Routes>
                    <Route path="/" element={<LoginForm title={title}/>}></Route>
                    <Route path="/register" element={<RegisterForm title={title}/>}></Route>
                    <Route path="/account" element={<ProtectedRoute><ChoresTrackerAccount/></ProtectedRoute>}></Route>
                </Routes>
            </Router>

            
        </div>
    );
};