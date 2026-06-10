import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { SlStar } from "react-icons/sl";


import '../choresApp.css';
import './ChoresItem.css';
import axios from "axios";

export default function ChoresItem( {choreId, actions}) {
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
        {'color': '#fff6df', 'className': 'color-yellow', 'name': 'Yellow'},
        {'color': '#d0f4de', 'className': 'color-green', 'name': 'Pastel green'},
        {'color': '#a9def9', 'className': 'color-blue', 'name': 'Blue'},
        {'color': '#e4c1f9', 'className': 'color-violet', 'name': 'Violet'},
    ];

    const closeForm = () => {
        // control changes - if yes - than - modal window
        /* modal window "are you sure" */
        actions.form.closeForm();
        actions.chore.setChoreId(null);
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
        actions.chore.saveChore(formData);
    };

    async function loadChoreData(choreId) {
        await axios(`/chores/${choreId}`, {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        })
        .then((res) => {
            console.log("chore is loaded");
            const chore = res.data;
            setFormData({
                title: chore.title ?? "",
                text: chore.text ?? "",
                due_datetime: chore.due_datetime ?? "",
                category: chore.category ?? "",
                color: chore.color ?? "",
                cost: chore.cost ?? "",
                istodo: Boolean(chore.istodo),
            });
        })
        .catch((err) => {

        })
    }
    useEffect(() => {
        if (!choreId) return;
        console.log('load chore data');

        loadChoreData(choreId);

    }, [choreId]);

    return (
        <div className="overlay-form">
            <div className="chores-form chores-item-add-edit">
                <div className="chores-form-header chores-item-header">
                    <span className="chores-form-header-title chores-item-header-title">{`${choreId?"Edit":"Add"}`} chore </span>
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
                        value={formData.title}
                    />
                    <textarea
                        id="text"
                        name="text"
                        className="chores-item-form-body"
                        placeholder="Insert text..."
                        onChange={handleChange}
                        value={formData.text}
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
                            value={formData.category}
                        >
                            {categoryList.map((category, i) => (
                                <option key={i}>{category.name}</option>
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
                            value={formData.color}
                        >
                            {colorList.map((color, i) => (
                                <option key={i} className={color.className} value={color.color}>{color.name}</option>
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
                            value={formData.cost}
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
                            value={formData.istodo}
                        />
                        <label htmlFor="istodo">Make ToDo list element </label>
                    </div>
                </div>
                <div className="chores-form-footer chores-item-footer" onClick={handleSave}>
                    <button>Save</button>
                </div>
            </div>
        </div>
    );
}