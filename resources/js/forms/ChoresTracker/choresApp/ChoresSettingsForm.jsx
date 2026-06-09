import React, { useState } from "react";

import { IoIosCloseCircle } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";

import './choresApp.css';
import './ChoresSettingsForm.css';

export default function ChoresSettingsForm({actions, settings}){
    const [formData, setFormData] = useState({
        mode: settings.userSettings.mode,
        changetodo: settings.userSettings.changetodo,
    });
    const modeList = [
        {'displayName': 'Simple mode', 'name': 'simple'},
        {'displayName': 'ToDo list', 'name': 'todolist'},
        {'displayName': 'Calendar', 'name': 'calendar'},
    ];


    const closeForm = () => {
        actions.form.closeForm();
    };

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSave = async () => {
        await axios('/chores/saveUserSettings' , {
            method: 'POST', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
            data: JSON.stringify({settings: formData}),
        })
        .then((res) => {
            actions.popup.setPopUp({
                isOpen: true,
                success: res.data.success, 
                message: res.data.message
            });
            closeForm();
        })
        .catch((err) => {
            console.log(err);
            
            actions.popup.setPopUp({
                isOpen: true,
                success: false, 
                message: 'Something went wrong'
            });
        });
    };

    return (
        <div className="overlay-form">
            <div className="chores-form chores-settings-form">
                <div className="chores-form-header chores-item-header">
                    <span className="chores-form-header-title chores-item-header-title">
                        <IoIosSettings />
                        Settings 
                    </span>
                    <div className="close-form" onClick={closeForm}>
                        <IoIosCloseCircle />
                    </div>
                </div>
                <hr />
                <div className="chores-form-main-window chores-settings-main-window">
                    <div className="chores-item-mode">
                        <label htmlFor="mode">Default mode: </label>
                        <select 
                            id="mode"
                            placeholder="Default mode" 
                            list="mode"
                            name="mode"
                            onChange={handleChange}
                            value={formData.mode}
                        >
                            {modeList.map((mode, i) => (
                                <option key={i} value={mode.name}>{mode.displayName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="chores-item-changetodo">
                        <input
                            type="checkbox"
                            id="changetodo"
                            name="changetodo"
                            className="chores-item-form-changetodo"
                            placeholder="changetodo.."
                            onChange={handleChange}
                            checked={formData.changetodo}
                        />
                        <label htmlFor="changetodo">All chore elements ARE ToDo elements </label>
                    </div>
                </div>
                <div className="chores-form-footer chores-item-footer" onClick={handleSave}>
                    <button>Save</button>
                </div>
            </div>
        </div>
    );
}