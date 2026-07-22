import React, { Component, type ChangeEvent } from "react";
import { useState } from "react";

interface BaseInputParams {
    label: string | null,
    name: string | undefined,
    placeholder: string | undefined,
}
interface InputParams extends BaseInputParams {
    required?: boolean,
    error: string | null,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onValueChange?: (e: React.ChangeEvent<HTMLInputElement>, value: string ) => void,
    serverMessageText?: string,
    success?: boolean,
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>,
}
export function Input({ label, name, placeholder, required=false, error, onValueChange }: InputParams) {
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val: string | null = e.target.value;
        setValue(val);

        if (typeof onValueChange === 'function') {
            onValueChange(e, val);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            <input
              type="text"
              name={name}
              className={`w-full border p-2 rounded ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              required={required}
            />
            {error && <span className="text-xs">{error}</span>}
        </div>
    );
}


interface EmailInputProps extends BaseInputParams {
}

export function EmailInput({ label, name, placeholder }: EmailInputProps) {
    const [error, setError]=useState("");

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
            setError("Please enter a valid email address");
        } else {
            setError("");
        }
    };

    return (
        <Input
            label={label}
            name={name}
            placeholder={placeholder}
            onValueChange={handleChangeEmail}
            error={error}
         />
    );
}

export function CustomTextInput({ label, name, placeholder, required=false, error, icon: Icon, onChange }: InputParams) {
    
    return (
        <div className="input-box">
            {label && (<label className="block text-sm font-medium">{label}</label>)}
            <input
              type="text"
              id={name}
              className={name}
              placeholder={placeholder}
              required={required}
              onChange={onChange}
            />
            {Icon && <Icon className="icon" />}
            {error && <span className="text-xs">{error}</span>}
        </div>
    );
}

export function CustomButtonInput({ placeholder, error }: InputParams) {
    
    return (
        <button
            type="submit"
            className="button-submit"
        >{placeholder}</button>
    );
}

export function MessageInput({ serverMessageText, success }: InputParams) {
    
    return (
        <div className={`message-box ${success ? "message-success":"message-error"}`}>
            <div> {serverMessageText}</div>
        </div>
    );
}