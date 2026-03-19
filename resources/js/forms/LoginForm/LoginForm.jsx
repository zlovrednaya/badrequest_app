import React, { Component } from "react";
import {Link} from 'react-router-dom';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Input, EmailInput, CustomTextInput, CustomButtonInput } from "../../components/elements/Inputs";

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
        <div className="LoginRegisterForm LoginForm">
            <div className="LoginRegisterFormBody">
                <form onSubmit={onSubmit}>
                    <h1 className="LoginRegisterFormTitle">{widget.title} | Login</h1>
                    <CustomTextInput 
                        name="username"
                        required={true}
                        icon={FaUser}
                        placeholder="Username / e-mail"
                    />
                    <CustomTextInput 
                        name="password"
                        required={true}
                        icon={RiLockPasswordFill}
                        placeholder="Password"
                    />
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <Link to="/register">Register now</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};
