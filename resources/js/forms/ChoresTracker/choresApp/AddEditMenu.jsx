import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { MdDraw } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";

import { useNavigate } from "react-router-dom";

import ChoresItem from "./ChoresItem";
import ChoresSettingsForm from "./ChoresSettingsForm";
import DrawItem from "./DrawItem";
import './choresApp.css';

export default function AddEditMenu() {
    const [disabledForm, setDisabledForm] = useState('');
    const [showForm, setShowForm] = useState();
    const [showDrawForm, setShowDrawForm] = useState();
    const [showSettingsForm, setShowSettingsForm] = useState();
    const [noteId, setNoteId] = useState();
    const openForm = () => {
        setDisabledForm(true);
        setShowForm(true);
    };

    const closeForm = () => {
        setDisabledForm(false);
        setShowForm(false);
    };

    const openDrawForm = () => {
        setDisabledForm(true);
        setShowDrawForm(true);
    };

    const closeDrawForm = () => {
        setDisabledForm(false);
        setShowDrawForm(false);
    };

    const openSettingsForm = () => {
        setDisabledForm(true);
        setShowSettingsForm(true);
    };

    const closeSettingsForm = () => {
        setDisabledForm(false);
        setShowSettingsForm(false);
    };
    return (
        <div>
            <div className={`menu-bar ${disabledForm && ('disabled')}`}>
                <div className="add-edit-menu">
                    <div className="add-edit-menu-icon" onClick={openForm}><MdAddCircleOutline /></div>
                    <div className="add-edit-menu-icon" onClick={openDrawForm}><MdDraw /></div>
                    <div className="add-edit-menu-icon" onClick={openForm}><MdEdit /></div>
                    <div className="add-edit-menu-icon"><MdDeleteOutline /></div>
                    <div className="add-edit-menu-icon"><MdShare /></div>
                </div>
                <div className="add-edit-menu-icon" onClick={openSettingsForm}><IoIosSettings /></div>
                
            </div>
            {showForm && (<ChoresItem noteId={noteId} onClose={closeForm} />)}
            {showDrawForm && (<DrawItem onClose={closeDrawForm} />)}
            {showSettingsForm && (<ChoresSettingsForm onClose={closeSettingsForm} />)}
        </div>
    );
}