import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { SlStar } from "react-icons/sl";


import '../choresApp.css';
import './choresItem.css';

export default function ChoresItem( {noteId, onClose, onNoteSaved, handleSaveChore}) {
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        due_datetime: "",
        category: "",
        color: "",
        cost: "",
        istodo: false,
    });

    const categoryList = [
        {'name': 'Home'},
        {'name': 'Schedule'},
        {'name': 'Notes'},
    ];

    const colorList = [
        {'color': '#ffffff', 'className': 'color-white', 'name': 'White',},
        {'color': '#ff99c8', 'className': 'color-rose', 'name': 'Rose',},
        {'color': '#fcf6bd', 'className': 'color-yellow', 'name': 'Yellow'},
        {'color': '#d0f4de', 'className': 'color-green', 'name': 'Pastel green'},
        {'color': '#a9def9', 'className': 'color-blue', 'name': 'Blue'},
        {'color': '#e4c1f9', 'className': 'color-violet', 'name': 'Violet'},
    ];

    const closeForm = () => {
        // control changes - if yes - than - modal window
        /* modal window "are you sure" */
        onClose();
    };

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    function handleSave(e) {
        //e.preventDefault();
        handleSaveChore(formData);
    };

    return (
        <div className="chores-form chores-item-add-edit">
            <div className="chores-form-header chores-item-header">
                <span className="chores-form-header-title chores-item-header-title">Add chore </span>
                <div className="close-form" onClick={closeForm}>
                    <IoIosCloseCircle />
                </div>
            </div>
            <hr />
            <div className="chores-form-main-window chores-item-form">
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="chores-item-form-header"
                    placeholder="Type header..."
                    onChange={handleChange}
                />
                <textarea
                    id="text"
                    name="text"
                    className="chores-item-form-body"
                    placeholder="Insert text..."
                    onChange={handleChange}
                />
                <div className="chores-item-form-datetime-block">
                    <input
                        type="datetime-local"
                        name="due_datetime"
                        className="chores-item-form-date"
                        placeholder="DD.MM.YY"
                        onChange={handleChange}
                    />
                </div>
                <div className="chores-item-categories">
                    <label htmlFor="category">Category: </label>
                    <select 
                        id="category"
                        placeholder="Choose category" 
                        name="category"
                        list="category"
                        onChange={handleChange}
                    >
                        {categoryList.map((category) => (
                            <option>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="chores-item-color">
                    <label htmlFor="color">Color: </label>
                    <select 
                        id="color"
                        placeholder="Choose color" 
                        list="color"
                        name="color"
                        onChange={handleChange}
                    >
                        {colorList.map((color) => (
                            <option className={color.className} value={color.color}>{color.name}</option>
                        ))}
                    </select>
                </div>
                <div className="chores-item-cost">
                    <input
                        type="text"
                        id="cost"
                        name="cost"
                        className="chores-item-form-cost"
                        placeholder="cost.."
                        onChange={handleChange}
                    />
                    <label htmlFor="cost"><SlStar /> </label>
                </div>
                <div className="chores-item-istodo">
                    <input
                        type="checkbox"
                        id="istodo"
                        name="istodo"
                        className="chores-item-form-istodo"
                        placeholder="istodo.."
                        onChange={handleChange}
                    />
                    <label htmlFor="istodo">Make ToDo list element </label>
                </div>
            </div>
            <div className="chores-form-footer chores-item-footer" onClick={handleSave}>
                <button>Save</button>
            </div>
        </div>
    );
}