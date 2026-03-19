import React, { Component } from "react";
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export default function LoginForm (widget) {
    const onSubmit = (data) => {
        // 1 - check e-mail in DB

        const existingUser = null;
        if (existingUser) {

        } else {
            const userData = {
                email: data.email,
                password: data.password,
            }
        }
    };

    return (
        <div className="LoginForm">
            <div className="LoginFormBody">
                <form onSubmit={onSubmit}>
                    <h1 className="LoginFormTitle">{widget.title} | Login</h1>
                    <div className="input-box">
                        <input id="username" type="email" placeholder="Username / e-mail" required></input>
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input id="password" type="password" placeholder="Password" required></input>
                        <RiLockPasswordFill className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="/register">Register now</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};
