import React, { Component, useState } from "react";
import {Link} from 'react-router-dom';
import { Input, EmailInput, CustomTextInput, CustomButtonInput } from "../../components/elements/Inputs";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import './RegisterForm.css';

async function signUp(signUpData) {
    await axios( window.location.href, {
        method: 'POST', 
        data: JSON.stringify(signUpData),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    })
    .then(data => data.json);
}

export default function RegisterForm(widget) {
    const [name, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const onSubmit = async e => {
        e.preventDefault();
        const token = await signUp({
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
                    <CustomTextInput 
                        name="name"
                        required={true}
                        icon={FaUser}
                        placeholder="Username"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <CustomTextInput 
                        name="email"
                        required={true}
                        icon={MdEmail}
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <CustomTextInput 
                        name="password"
                        required={true}
                        icon={RiLockPasswordFill}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <CustomButtonInput 
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