import React, { Component } from "react";
import LoginForm from "../LoginForm/LoginForm";
import './ChoresTrackerForm.css';
import RegisterForm from "../RegisterForm/RegisterForm";

export default function ChoresTracker() {
    return (
        <div className="ChoresTrackerForm fixed inset-0 flex items-center justify-center bg-black/40">
            <LoginForm
                title="Chores"
            />
            <RegisterForm
                title="Chores"
            />
        </div>
    );
};