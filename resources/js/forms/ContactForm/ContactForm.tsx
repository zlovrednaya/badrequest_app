import React, { useState } from "react";
import * as InputComponents from "../../components/elements/Inputs.js";
import { IoArrowBack } from "react-icons/io5";


import "./ContactForm.css";

type ContactFormProps = {
    isOpen: boolean,
    onClose: () => void,
};

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
    const [email, setEmail] = useState('');
    const [password, setName] = useState('');

    return (
        <div className={`contact-form-overlay ${isOpen ? "open": ""}`}>
            <div className="contact-form">
                <div className="return-button hover-effect cursor-pointer" onClick={onClose}><IoArrowBack/> Return</div>
                <div className="contact-sub-form contact-info">
                    <h1>Contact</h1>
                    <div>
                        Daria Hostieva
                    </div>
                    <div className="contact-info-email">
                        dariahostieva.nl@gmail.com
                    </div>
                    <div className="contact-info-phone">
                        +31 (6) 3000-41-21
                    </div>

                </div>
                <form className="contact-sub-form contact-data">
                    <InputComponents.CustomTextInput
                        label={null} 
                        name="emaile"
                        required={true}
                        placeholder="Your e-mail"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputComponents.CustomTextInput
                        label={null} 
                        name="Your full name"
                        required={true}
                        placeholder="Your full name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <InputComponents.TextareaInput 
                        placeholder="Describe your request"
                    />
                    <div className="button-right">
                        <InputComponents.CustomButtonInput 
                            placeholder="Send message"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}