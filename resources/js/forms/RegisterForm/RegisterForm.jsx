import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import * as InputComponents from "../../components/elements/Inputs";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import './RegisterForm.css';

export default function RegisterForm(widget) {
    const [name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [serverMessage, setServerMessage] = useState(null);

    const signUp = (signUpData) => {

        signUpData.appName = widget.appName;
        axios( window.location.href, {
            method: 'POST', 
            data: JSON.stringify(signUpData),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
        })
        .then(data => {
            console.log(data.json);
            setServerMessage({ 
                success: true, 
                text: 'Successfully registered',
            });
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
    }
    const onSubmit = (e) => {
        e.preventDefault();
        signUp({
            name,
            email,
            password,
        });
    };
    return (
        <div className="LoginRegisterForm RegisterForm">
            <div className="LoginRegisterFormBody">
                <form onSubmit={onSubmit}>
                    <h1 className="LoginRegisterFormTitle">{widget.title} | Sign Up</h1>
                    <InputComponents.CustomTextInput 
                        name="name"
                        required={true}
                        icon={FaUser}
                        placeholder="Username"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <InputComponents.CustomTextInput 
                        name="email"
                        required={true}
                        icon={MdEmail}
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputComponents.CustomTextInput 
                        name="password"
                        required={true}
                        icon={RiLockPasswordFill}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {serverMessage?.text && 
                        <InputComponents.MessageInput 
                            success={serverMessage.success}
                            serverMessageText={serverMessage.text} />
                    }

                    <InputComponents.CustomButtonInput 
                        placeholder="Sign up"
                    />
                    <div className="register-link">
                        <p>Already have an account? <Link to="/">Log in</Link></p>
                    </div>
                </form>
            </div>

        </div>
    );
}