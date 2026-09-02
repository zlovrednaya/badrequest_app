import React, { Component, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import * as InputComponents from "../../components/elements/Inputs.js";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import './LoginRegisterForm.css';

type RegisterFormProps = {
    appName: string,
    title: string,
};

export default function RegisterForm(widget: RegisterFormProps) {
    const [name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [serverMessage, setServerMessage]: [any, React.Dispatch<React.SetStateAction<any>>] = useState(null);

    const signUp = (signUpData: {
        name: string,
        email: string,
        password: string,
        appName?: string, 
    }) => {
        signUpData.appName = widget.appName;
        axios( window.location.href, {
            method: 'POST', 
            data: JSON.stringify(signUpData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        .then((data: any) => {
            console.log(data.json);
            setServerMessage({ 
                success: true, 
                text: 'Successfully registered',
            });
        })
        .catch((err: any) => {
            console.log(err);
            let errors = err.response.data.errors;
            let errorText = err.response.data.message;
            setServerMessage({ 
                success: false, 
                text: err.response?.data?.message || 'Something went wrong' 
            });
        })
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                        label={null}
                        name="name"
                        required={true}
                        icon={FaUser}
                        placeholder="Username"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <InputComponents.CustomTextInput 
                        label={null}
                        name="email"
                        required={true}
                        icon={MdEmail}
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputComponents.CustomTextInput 
                        label={null}
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