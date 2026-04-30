import React from "react";

import { IoIosCloseCircle } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";

import './choresApp.css';
import './ChoresSettingsForm.css';

export default function ChoresSettingsForm({onClose}){

    const modeList = [
        {'displayName': 'Simple mode', 'name': 'simple'},
        {'displayName': 'ToDo list', 'name': 'todolist'},
        {'displayName': 'Calendar', 'name': 'calendar'},
    ];

    const closeForm = () => {
        onClose();
    };

    const handleChange = () => {

    };

    const handleSave = () => {

    };

    return (
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
                    >
                        {modeList.map((mode) => (
                            <option value={mode.name}>{mode.displayName}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="chores-form-footer chores-item-footer" onClick={handleSave}>
                <button>Save</button>
            </div>
        </div>
    );
}