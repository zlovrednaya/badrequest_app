import React, { Component } from "react";
import { useState } from "react";
import { Input, EmailInput } from "../components/elements/Inputs";

function AviationStackForm({ widget, onClose }) {
    const [formData, setFormData] = useState({
        email: "",
        flight_number: "",
    });

    const sendData = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const formData = {
            email: data.get("email"),
            flight_number: data.get("flight_number"),
        };
        setFormData(formData);

        axios("http://localhost:8000/observeFlight", {
                method: 'POST', 
                data: JSON.stringify(formData),
                headers: new Headers({
                     'Content-Type': 'application/json',
                     'Accept': 'application/json',
                }),
            })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setFormData('')
            })
            .catch((err) => console.log('error'));
        
        onClose();
    };

    return (
        <div className = "fixed inset-0 flex items-center justify-center bg-black/40">
            <div className = "bg-white p-6 rounded-xl w-96 shadow-lg">
                <h2 className = "text-xl font-bold mb-4">
                {widget.name} subscription
                </h2> 
                <form onSubmit = {sendData} className="space-y-4">
                    <EmailInput 
                        label = "E-mail" 
                        name = "email"
                        placeholder = "Enter E-mail"
                    />
                    <Input
                        label = "Flight number" 
                        name = "flight_number"
                        placeholder = "For instance, HV6002"
                    />
                    <div className = "flex justify-end gap-2">
                        <button
                            type = "button"
                            onClick = {onClose}
                            className = "px-4 py-2 border rounded cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type = "submit"
                            className = "px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AviationStackForm;