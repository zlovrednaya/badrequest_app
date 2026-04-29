import React, { useState } from "react";

import { MdAddCircleOutline } from "react-icons/md";
import { MdDraw } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";


import { useNavigate } from "react-router-dom";

import ChoresItem from "../ChoresItem";
import ChoresSettingsForm from "../ChoresSettingsForm";
import DrawItem from "../DrawItem";

import { useWarning } from "../../../../components/elements/Warning.jsx";
import '../choresApp.css';
import axios from "axios";

export default function AddEditMenu({selectedChores}) {
    const [disabledForm, setDisabledForm] = useState('');
    const [showForm, setShowForm] = useState();
    const [showDrawForm, setShowDrawForm] = useState();
    const [showSettingsForm, setShowSettingsForm] = useState();
    const [noteId, setNoteId] = useState();
    const { askWarning } = useWarning();
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


    const deleteChores = async () => {
        const warningResult = await askWarning({
            title: 'You want to delete chores',
            message: 'Are you sure?',
            confirmText: 'Yes, delete',
            cancelText: 'No, keep chores'
        });

        if (!warningResult) return;
        
        const choreIds = Object.keys(selectedChores).filter(key=>selectedChores[key]);
        
        await axios('/chores/deleteChores', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
            data: JSON.stringify({ids:choreIds}),
        })
        .then((res) => {
            debugger;
        })
        .catch(() => {
            debugger;
        })
    };

    const shareChores = async () => {

    };

    const isActionRequired = Object.values(selectedChores).filter(Boolean).length;

    return (
        <div>
            <div className={`menu-bar ${disabledForm && ('disabled')}`}>
                <div className="add-edit-menu">
                    <div className="add-edit-menu-icon" title="Add chore" onClick={openForm}><MdAddCircleOutline /></div>
                    <div className="add-edit-menu-icon" title="Add drawing" onClick={openDrawForm}><MdDraw /></div>
                    {isActionRequired > 0 && (
                        <div className="add-edit-menu edit-menu ">
                            <div className="add-edit-menu-icon" title="Show chore" onClick={openForm}><IoEyeSharp /></div>
                            <div className="add-edit-menu-icon" title="Delete chores" onClick={deleteChores}> <MdDeleteOutline /></div>
                            <div className="add-edit-menu-icon" title="Shore chores" onClick={shareChores}><MdShare /></div>
                        </div>
                    )}
                </div>
                <div className="menu-shape-settings">
                    <div className="add-edit-menu-icon" title="Switch to calendar"><CiCalendarDate/></div>
                    <div className="add-edit-menu-icon" title="Switch to ToDo list"><CiBoxList/></div>
                    <div className="add-edit-menu-icon" title="Settings" onClick={openSettingsForm}><IoIosSettings /></div>
                </div>
            </div>
            {showForm && (<ChoresItem noteId={noteId} onClose={closeForm} />)}
            {showDrawForm && (<DrawItem onClose={closeDrawForm} />)}
            {showSettingsForm && (<ChoresSettingsForm onClose={closeSettingsForm} />)}
        </div>
    );
}