import React, { Component } from "react";
import { useState } from "react";

export function Input({ label, name, placeholder, required = false, error, onValueChange }) {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const val = e.target.value;
        setValue(val);

        if (typeof onValueChange === 'function') {
            onValueChange(e, val);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            <input
              type = "text"
              name = {name}
              className = {`w-full border p-2 rounded ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder = {placeholder}
              value = {value}
              onChange = {handleChange}
              required = {required}
            />
            {error && <span className = "text-xs">{error}</span>}
        </div>
    );
}

export function EmailInput({ label, name, placeholder }) {
    const [error, setError] = useState("");

    const handleChangeEmail = (field, value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
            setError("Please enter a valid email address");
        } else {
            setError("");
        }
    };

    return (
        <Input
            label = {label}
            name = {name}
            placeholder = {placeholder}
            onValueChange = {handleChangeEmail}
            error = {error}
         />
    );
}