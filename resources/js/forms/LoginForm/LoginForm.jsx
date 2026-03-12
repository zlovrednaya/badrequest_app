import React, { Component } from "react";
import './LoginForm.css'

export default function LoginForm () {
    return (
        <div className="LoginForm">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                <form>
                    <h1>Login</h1>
                    <div>
                        <input type="text" placeholder="e-mail" required></input>
                    </div>
                    <div>
                        <input type="password" placeholder="password" required></input>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" placeholder="password" required />Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link"></div>
                </form>
            </div>
        </div>
    );
};
