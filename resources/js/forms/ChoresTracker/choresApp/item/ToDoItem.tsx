import React, { useState } from "react";

import { SlStar } from "react-icons/sl";
import "./ToDoItem.css";

type ToDoItemProps = {
    actions: any,
};


export default function ToDoItem ({actions}: ToDoItemProps) {

    const baseFormState = {
            cost: "",
            text: "",
            istodo: true,
    };

    const [formData, setFormData] = useState(baseFormState);

    
    function handleSave() {
        actions.chore.saveChore(formData);
        setFormData(baseFormState);
    };

    function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.which != 13) return;
        handleSave();
    }
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="todo-add-edit" onKeyUp={onKeyUp}>
            <input
                    type="text"
                    name="text"
                    className="todo-item-form-text"
                    placeholder="Add new ToDo item, type here..."
                    onChange={handleChange}
                    value={formData.text}
            />
            <div className="todo-item-form-cost">
                <input
                    type="text"
                    id="cost"
                    name="cost"
                    className="todo-item-form-cost-input"
                    placeholder="cost.."
                    onChange={handleChange}
                    value={formData.cost}
                />
                <label htmlFor="cost"><SlStar /> </label>
            </div>
            <div className="todo-item-save" onClick={handleSave} >
                <button>Add</button>
            </div>
        </div>
    );
}