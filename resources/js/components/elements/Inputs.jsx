import React, { Component } from "react";
import { useState } from "react";

export function Input({ label, name, placeholder, required = false, onChange }) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const val = e.target.value;

        if (typeof onChange === 'function') {
            onChange(e, val);
        }
        setValue(val);
    };

    return (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            <input
              type = "text"
              name = {name}
              className = "w-full border p-2 rounded"
              placeholder = {placeholder}
              value = {value}
              onChange = {handleChange}
              required = {required}
            />
        </div>
    );
}

export function EmailInput({ label, name, placeholder }) {
    const [error, setError] = useState("");

    const handleChangeEmail = (field, value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
            setError("Please enter a valid email address");
            console.log('not valid');
            
            return;
        }
    };

    return (
        <Input
            label = {label}
            name = {name}
            placeholder = {placeholder}
            onChange = {handleChangeEmail}
         />
    );
}