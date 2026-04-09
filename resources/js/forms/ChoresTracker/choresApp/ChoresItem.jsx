import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { SlStar } from "react-icons/sl";


import './choresApp.css';
import './choresItem.css';
export default function ChoresItem(noteId) {

    const [categorie, setCategorie] = useState('');
    const [header, setHeader] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [category, setCategory] = useState();
    const [color, setColor] = useState();
    const [cost, setCost] = useState('');

    const categoryList = [
        {'name': 'Home'},
        {'name': 'Schedule'},
        {'name': 'Notes'},
    ];

    const colorList = [
        {'color': '#ff99c8', 'className': 'color-rose', 'name': 'Rose',},
        {'color': '#fcf6bd', 'className': 'color-yellow', 'name': 'Yellow'},
        {'color': '#d0f4de', 'className': 'color-green', 'name': 'Pastel green'},
        {'color': '#a9def9', 'className': 'color-blue', 'name': 'Blue'},
        {'color': '#e4c1f9', 'className': 'color-violet', 'name': 'Violet'},
    ]
    const closeForm = () => {

    };
    return (
        <div className="chores-item">
            <div className="chores-item-header">
                <span className="chores-item-header-title">Add chore </span>
                <div className="close-form" onClick={closeForm}>
                    <IoIosCloseCircle />
                </div>
            </div>
            <hr />
            <div className="chores-item-form">
                <input
                    type="text"
                    id="header"
                    className="chores-item-form-header"
                    placeholder="Type header..."
                    onChange={(e) => setHeader(e.target.value)}
                />
                <textarea
                    id="body"
                    className="chores-item-form-body"
                    placeholder="Insert text..."
                    onChange={(e) => setBody(e.target.value)}
                />
                <div className="chores-item-form-datetime-block">
                    <input
                        type="date"
                        className="chores-item-form-date"
                        placeholder="DD.MM.YY"
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                        type="time"
                        className="chores-item-form-time"
                        id="time"
                        name="time"
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div className="chores-item-categories">
                    <label for="category">Category: </label>
                    <input 
                        placeholder="Choose category" 
                        list="category"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <datalist id="category">
                        {categoryList.map((category) => (
                            <option>{category.name}</option>
                        ))}
                    </datalist>
                </div>
                <div className="chores-item-color">
                    <label for="color">Color: </label>
                    <input 
                        placeholder="Choose color" 
                        list="color"
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <datalist id="color">
                        {colorList.map((color) => (
                            <option className={color.className}>{color.name}</option>
                        ))}
                    </datalist>
                </div>
                <div className="chores-item-cost">
                    <input
                        type="text"
                        id="cost"
                        className="chores-item-form-cost"
                        placeholder="cost.."
                        onChange={(e) => setCost(e.target.value)}
                    />
                    <label for="cost"><SlStar /> </label>
                </div>
            </div>
            <div className="chores-item-footer">
                <button>Save</button>
            </div>
        </div>
    );
}