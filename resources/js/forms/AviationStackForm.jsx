import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Input, EmailInput } from "../components/elements/Inputs";

function AviationStackForm({ widget, onClose }) {
    const [formData, setFormData] = useState({
        email: "",
        api_key: "",
        flight_number: "",
    });

    const sendData = (e) => {
        const data = new FormData(e.target);
        const formData = {
            email: data.get("email"),
            webhook: data.get("api_key"),
            token: data.get("flight_number"),
        };

        e.preventDefault();
        fetch("http://127.0.0.1:8000/observeFlight", {
                method: 'POST', 
                //mode: 'cors', 
                //redirect: 'follow',
                body: JSON.stringify(formData),
                headers: new Headers({ 'Content-Type': 'application/json' })
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
          <Input
            label = "API Key" 
            name = "api_key"
            placeholder = "Enter API Key (optional)"
            //value = {formData.email} 
            //onChange = {(val) => handleChange("email", val)}
          />
          <EmailInput 
            label = "E-mail" 
            name = "email"
            placeholder = "Enter E-mail"
            //value = {formData.email} 
            //onChange = {(val) => handleChange("email", val)}
          />
          <Input
            label = "Flight number" 
            name = "flight_number"
            placeholder = "For instance, HV6002"
            //value = {formData.email} 
            //onChange = {(val) => handleChange("email", val)}
          />

          <div className = "flex justify-end gap-2">
            <button
              type = "button"
              onClick = {onClose}
              className = "px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type = "submit"
              className = "px-4 py-2 bg-blue-600 text-white rounded"
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