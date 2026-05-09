import React, { useState, useEffect } from "react";

import { MdAddCircleOutline } from "react-icons/md";
import { MdStickyNote2 } from "react-icons/md";

import { MdDraw } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegSquareMinus } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";

import { MdShare } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { RiRectangleFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";

import ChoresItem from "../item/ChoresItem.jsx";
import DrawItem from "../item/DrawItem.jsx";
import ToDoItem from "../item/ToDoItem.jsx";
import ChoresSettingsForm from "../ChoresSettingsForm";


import { useWarning } from "../../../../components/elements/Warning.jsx";
import '../choresApp.css';
import axios from "axios";

export default function AddEditMenu({selectedChores, setSelectedChores, calendarMode, actions}) {
    const [disabledForm, setDisabledForm] = useState('');
    const [activeForm, setActiveForm] = useState(null);
    const [noteId, setNoteId] = useState();
    const { askWarning } = useWarning();
    const choreIds = Object.keys(selectedChores).filter(key=>selectedChores[key]);

    const openForm = (formName) => {
        setActiveForm(formName);
        setDisabledForm(true);
    };

    const closeForm = () => {
        setDisabledForm(false);
        setActiveForm(null);
    };

    const saveChore = async (formData) => {
        await axios( window.location.origin+'/chores/add', {
            method: 'POST', 
            data: JSON.stringify(formData),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
        })
        .then(res => {
            closeForm();
            actions.chore.onChoreSaved(calendarMode);
        })
        .catch(err => {
            console.log(err);
            let errors = err.response.data.errors;
            let errorText = err.response.data.message;
        })
    };

    const deleteChores = async () => {
        
        const warningResult = await askWarning({
            title: 'You want to delete selected chores (' + choreIds.length + (choreIds.length > 1? " pcs" : " pc" ) + ')' ,
            message: 'Are you sure?',
            confirmText: 'Yes, delete',
            cancelText: 'No, keep chores'
        });

        if (!warningResult) return;
        
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
            actions.chore.onChoreSaved(calendarMode);
            // update selected chores
            setSelectedChores([]);
        })
         .catch(err => {
            console.log(err);
            let errors = err.response.data.errors;
            let errorText = err.response.data.message;
        })
    };

    const shareChores = async () => {
        const choreIds = Object.keys(selectedChores).filter(key=>selectedChores[key]);
        await axios('/chores/shareChores', {
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

    const switchMode = (mode) => {
        actions.mode.changeCalendarMode(mode);
        setSelectedChores([]);
    };

    const listActions = {
        ...actions,
        chore: {
            ...actions.chore,
            saveChore: saveChore,
            deleteChores: deleteChores,
            shareChores: shareChores,
        },
        form: {
            closeForm
        },
    };

    const isActionRequired = Object.values(selectedChores).filter(Boolean).length;

    return (
        <div>
            <div className={`menu-bar ${disabledForm && ('disabled')}`}>
                <div className="add-edit-menu">
                    {calendarMode !== 'todolist' && (
                        <div className="add-edit-menu">
                            <div className="add-edit-menu-icon" title="Add chore" onClick={() => openForm("ChoresItem")}><MdStickyNote2 /></div>
                            <div className="add-edit-menu-icon" title="Add drawing" onClick={() => openForm("DrawItem")}><MdDraw /></div>
                        </div>
                    )}
                    {calendarMode === 'todolist' && (
                        <div className="add-edit-menu-icon" title="Add ToDo item" onClick={() => openForm("ToDoItem")}><FaListCheck /></div>
                    )}
                    
                    {isActionRequired > 0 && (
                        <div className="add-edit-menu edit-menu ">
                            {choreIds && choreIds.length == 1 && (
                                <div className="edit-menu-one-selected">
                                    <div className="add-edit-menu-icon" title="Show chore" onClick={openForm}><IoEyeSharp /></div>
                                    <div className="add-edit-menu-icon" title="Share chores" onClick={listActions.chore.shareChores}><MdShare /></div>
                                </div>
                            )}
                            <div className="add-edit-menu-icon" title="Unselect chores" onClick={() => setSelectedChores([])}> <FaRegSquareMinus /></div>
                            <div className="add-edit-menu-icon" title="Delete chores" onClick={listActions.chore.deleteChores}> <MdDelete /></div>
                        </div>
                    )}
                </div>
                <div className="menu-shape-settings">
                    <div className="menu-shape-settings-mode">
                        <div className={`add-edit-menu-icon menu-shape-mode ${calendarMode == 'simple' && ('selected')}`} title="Switch to simple mode" onClick={()=>{switchMode('simple')}}><RiRectangleFill/></div>
                        <div className={`add-edit-menu-icon menu-shape-mode ${calendarMode == 'calendar' && ('selected')}`} title="Switch to calendar" onClick={()=>{switchMode('calendar')}}><CiCalendarDate/></div>
                        <div className={`add-edit-menu-icon menu-shape-mode ${calendarMode == 'todolist' && ('selected')}`} title="Switch to ToDo list" onClick={()=>{switchMode('todolist')}}><CiBoxList/></div>
                    </div>
                    <div className="add-edit-menu-icon" title="Settings" onClick={() => openForm("ChoresSettingsForm")}><IoIosSettings /></div>
                </div>
            </div>
            {activeForm === "ChoresItem" && (<ChoresItem 
                noteId={noteId} 
                actions={listActions} 
            />)}
            {activeForm === "DrawItem" && (<DrawItem 
                actions={listActions} 
            />)}
            {activeForm === "ChoresSettingsForm" && (<ChoresSettingsForm 
                actions={listActions} 
                />)}
            {calendarMode == "todolist" && (<ToDoItem 
                actions={listActions} 
            />)}
        </div>
    );
}