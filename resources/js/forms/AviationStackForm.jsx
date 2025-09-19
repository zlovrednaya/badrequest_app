import React, { Component } from "react";
import { useState, useEffect } from "react";
function AviationStackForm({ widget, onClose }) {
    const [formData, setFormData] = useState({
        email: "",
        api_key: "",
        flight_number: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const sendData = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/observeFlight", {
                method: 'GET', 
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

        <form onSubmit={sendData} className="space-y-4">
          <div>
            <label className = "block text-sm font-medium">API Key</label>
            <input
              type = "text"
              name = "api_key"
              className = "w-full border p-2 rounded"
              placeholder = "Enter API Key (optional)"
              value = {formData.api_key}
              onChange = {handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">E-mail</label>
            <input
              type = "text"
              name = "email"
              className = "w-full border p-2 rounded"
              placeholder = "Enter e-mail"
              value = {formData.email}
              onChange = {handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Flight number</label>
            <input
              type = "text"
              name = "flight_number"
              className = "w-full border p-2 rounded"
              placeholder = "For instance, HV6002"
              value = {formData.flight_number}
              onChange = {handleChange}
            />
          </div>

          <div className="flex justify-end gap-2">
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