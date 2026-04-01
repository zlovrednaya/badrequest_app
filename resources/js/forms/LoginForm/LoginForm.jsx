import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as InputComponents from "../../components/elements/Inputs";

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import './LoginForm.css';

export default function LoginForm (widget) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [serverMessage, setServerMessage] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if(token) {
            navigate("account");
        }
     }, [navigate]);

    const login = (userData) => {
        axios( window.location.href+'login', {
            method: 'POST', 
            data: JSON.stringify(userData),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
        })
        .then(res => {
            debugger;
            console.log(res.data);
            //setToken(token);
            localStorage.setItem('token', res.data.token);
            sessionStorage.setItem('token', res.data.token);
            navigate('account');
        })
        .catch(err => {
            console.log(err);
            let errors = err.response.data.errors;
            let errorText = err.response.data.message;
            setServerMessage({ 
                success: false, 
                text: err.response?.data?.message || 'Something went wrong' 
            });
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        login({email, password});
    };

    return (
        <div className="LoginRegisterForm LoginForm">
            <div className="LoginRegisterFormBody">
                <form onSubmit={onSubmit}>
                    <h1 className="LoginRegisterFormTitle">{widget.title} | Login</h1>
                    <InputComponents.CustomTextInput 
                        name="username"
                        required={true}
                        icon={FaUser}
                        placeholder="Username / e-mail"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputComponents.CustomTextInput 
                        name="password"
                        required={true}
                        icon={RiLockPasswordFill}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    {serverMessage?.text && 
                        <InputComponents.MessageInput 
                            success={serverMessage.success}
                            serverMessageText={serverMessage.text} />
                    }
                    <InputComponents.CustomButtonInput 
                        placeholder="Login"
                    />
                    <div className="register-link">
                        <p>Don't have an account? <Link to="/register">Register now</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
};
