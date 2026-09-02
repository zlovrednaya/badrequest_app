import React from 'react';

import type { BaseWidgetFormProps } from '../BaseWidgetForm.tsx';

import { AuthProvider } from "../../auth/AuthContext";
import { WarningProvider } from "../../components/elements/Warning";
import LoginForm from "../../components/auth/LoginForm.tsx";
import RegisterForm from "../../components/auth/RegisterForm";
import ProtectedRoute from "../../components/ProtectedRoute.tsx";

import "./PlantPlan.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function PlantPlan({widget, onClose}: BaseWidgetFormProps) {
    const title = widget.name;
    const appName = widget.id;
    return (
        <WarningProvider>
            <AuthProvider> 
                <div className={`${widget.id} widget-form`}>
                    <div className="app-form">
                        <p>Welcome to your {appName}!</p>
                    </div>

                    <Router>
                        <Routes>
                            <Route path="/" element={<LoginForm title={title} appName={appName} />}></Route>
                            <Route path="/register" element={<RegisterForm title={title} appName={appName}/>}></Route>
                        </Routes>
                    </Router>
                </div>
                <div className="gap-2 close-btn-container rounded-xl absolute">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded cursor-pointer close-btn"
                    >
                    </button>
                </div>
            </AuthProvider>
        </WarningProvider>
        
    );
}