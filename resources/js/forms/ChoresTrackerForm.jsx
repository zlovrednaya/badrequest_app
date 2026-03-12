import React, { Component } from "react";
import LoginForm from "./LoginForm/LoginForm";
export default function ChoresTracker() {
    return (
        <div className = "fixed inset-0 flex items-center justify-center bg-black/40">
            <LoginForm/>
        </div>
    );
};