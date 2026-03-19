import React, { Component, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import './ChoresTrackerForm.css';

export default function ChoresTracker() {
    const title = "Chores";

    const [token, setToken] = useState();

  /*if(!token) {
    return <LoginForm setToken={setToken} />
  } */

    return (
        <div className="ChoresTrackerForm fixed inset-0 flex items-center justify-center bg-black/40">            
            <Router>
                <Routes>
                    <Route path="/" element={<LoginForm title={title}/>}></Route>
                    <Route path="/register" element={<RegisterForm title={title}/>}></Route>
                </Routes>
            </Router>

            
        </div>
    );
};