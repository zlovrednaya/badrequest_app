import React, { useState } from "react";

import { SlStar } from "react-icons/sl";
import "./ToDoItem.css";

export default function ToDoItem ( {handleSaveChore}) {

    const baseFormState = {
            cost: "",
            text: "",
            istodo: true,
        };

    const [formData, setFormData] = useState(baseFormState);

    
    function handleSave () {
        handleSaveChore(formData);
        setFormData(baseFormState);
    };
    
    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="todo-add-edit">
            <input
                    type="text"
                    name="text"
                    className="todo-item-form-text"
                    placeholder="Add new ToDo item, type here..."
                    onChange={handleChange}
            />
            <div className="todo-item-form-cost">
                <input
                    type="text"
                    id="cost"
                    name="cost"
                    className="todo-item-form-cost-input"
                    placeholder="cost.."
                    onChange={handleChange}
                />
                <label htmlFor="cost"><SlStar /> </label>
            </div>
            <div className="todo-item-save" onClick={handleSave}>
                <button>Add</button>
            </div>
        </div>
    );
}