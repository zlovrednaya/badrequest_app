import React, { Component } from "react";
import { useState } from "react";
import { Input, EmailInput } from "../components/elements/Inputs";

function AviationStackForm({ widget, onClose }) {
    const [formData, setFormData] = useState({
        email: "",
        flight_number: "",
    });

    const [serverMessage, setServerMessage] = useState(null);

    const sendData = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const formData = {
            email: data.get("email"),
            flight_number: data.get("flight_number"),
        };
        setFormData(formData);

        axios( window.location.href + "observeFlight", {
                method: 'POST', 
                data: JSON.stringify(formData),
                headers: new Headers({
                     'Content-Type': 'application/json',
                     'Accept': 'application/json',
                }),
            })
            .then((result) => {
                console.log('success');
                setServerMessage({ 
                    success: result.data.success, 
                    text: result.data.message,
                });
            })
            .catch((err) => {
                console.log('error');
                console.log(err);
                setServerMessage({ 
                    success: false, 
                    text: 'An error occured'
                });
            })
            
            
        
        // onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                {widget.name} subscription
                </h2> 
                <form onSubmit={sendData} className="space-y-4">
                    <EmailInput 
                        label="E-mail" 
                        name="email"
                        placeholder="Enter E-mail"
                    />
                    <Input
                        label="Flight number" 
                        name="flight_number"
                        placeholder="For instance, HV6002"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type = "submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                        >
                            Subscribe
                        </button>
                    </div>
                </form>

                {serverMessage && (
                    <div
                    className={`p-3 rounded mt-2 ${
                        serverMessage.success === true
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-red-100 text-red-700 border border-red-300"
                    }`}
                    >
                    {serverMessage.text}
                    </div>
                )}
            </div>
        </div>
    );
}
export default AviationStackForm;