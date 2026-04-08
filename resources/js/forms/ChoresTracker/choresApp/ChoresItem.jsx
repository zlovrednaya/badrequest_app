import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

import './choresApp.css';
export default function ChoresItem(noteId) {

    const [categorie, setCategorie] = useState('');
    const [header, setHeader] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [dueDate, setDuedate] = useState('');
    const [description, setDuescription] = useState('');
    const [cost, setCost] = useState('');

    const closeForm = () => {

    };
    return (
        <div className="chores-item">
            <div className="chores-item-header">
                <span className="chores-item-header-title">Add item </span>
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
                <div className="chores-item-categories"></div>
            </div>
            <div className="chores-item-footer">
                <button>Save</button>
            </div>
        </div>
    );
}