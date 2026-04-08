import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import ChoresItem from "./ChoresItem";
import './choresApp.css';

export default function AddEditMenu() {
    
    const [showForm, setShowForm] = useState();
    const [noteId, setNoteId] = useState();
    const openAddEditForm = () => {
        setShowForm(true);
    };
    return (
        <div>
            <div className="add-edit-menu">
                <div className="add-edit-menu-icon" onClick={openAddEditForm}><MdAddCircleOutline /></div>
                <div className="add-edit-menu-icon" onClick={openAddEditForm}><MdEdit /></div>
                <div className="add-edit-menu-icon"><MdDeleteOutline /></div>
                <div className="add-edit-menu-icon"><MdShare /></div>
            </div>
            {showForm && (<ChoresItem noteId={noteId} />)}
        </div>
    );
}