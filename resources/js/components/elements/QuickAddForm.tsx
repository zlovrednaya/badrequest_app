import React, { useState, useEffect } from "react";
import "./QuickAddForm.css";
import QuickAddMenu from "../../forms/ChoresTracker/choresApp/menu/QuickAddMenu";
import { formatDateTime } from "../../utils/date";

type QuickAddFormProps = {
    params: {
        day?: string,
        hour?: string,
        minutes?: string,
    },
    onSave: (formData: {title: string, due_datetime: string | Date}) => void,
};

export default function QuickAddForm({ params, onSave }: QuickAddFormProps) {

    const baseFormState = {
            title: "",
            due_datetime: params ? new Date(params.day + " " + params.hour + ":" + params.minutes) : "",
    };
    const [formData, setFormData] = useState(baseFormState);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // save
        onSave(formData);
        // set to base
        setFormData(baseFormState);
    };

    useEffect(() => {
        if(!params) return;
    })
    return (
        <div className="quick-add-form">
            <div className="quick-add-form-title">Add a chore
                on
                <span className="quick-add-form-time">{formatDateTime(params?.day, 'shortmonthwithyear')}</span> 
                 at 
                <span className="quick-add-form-time">{params?.hour} : {params?.minutes}</span>
            </div>
            <div className="quick-add-form-body">
                
                <QuickAddMenu 
                    formData={formData}
                    onChange={setFormData}
                    onSave={handleSave} 
                />
            </div>
        </div>
    );
}