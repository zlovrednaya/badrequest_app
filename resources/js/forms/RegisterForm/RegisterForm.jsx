import React, { Component } from "react";
import './RegisterForm.css';
import '../ChoresTracker/ChoresTrackerForm.css';
import { Input, EmailInput, CustomTextInput } from "../../components/elements/Inputs";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export default function RegisterForm(widget) {
    const onSubmit = () => {

    };
    return (
        <div className="LoginRegisterForm">
            <div className="LoginRegisterFormBody">
                <form onSubmit={onSubmit}>
                    <h1 className="LoginRegisterFormTitle">{widget.title} | Sign Up</h1>
                    <CustomTextInput 
                        name="name"
                        required="true"
                        icon={FaUser}
                        placeholder="Name"
                    />
                    <CustomTextInput 
                        name="email"
                        required="true"
                        icon={MdEmail}
                        placeholder="E-mail"
                    />
                    <CustomTextInput 
                        name="password"
                        required="true"
                        icon={RiLockPasswordFill}
                        placeholder="password"
                    />
                </form>
            </div>

        </div>
    );
}