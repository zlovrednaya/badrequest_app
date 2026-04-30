import React, { useState } from "react";

import { MdAddCircleOutline } from "react-icons/md";
import { MdStickyNote2 } from "react-icons/md";

import { MdDraw } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegSquareMinus } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import { MdShare } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { RiRectangleFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";

import ChoresItem from "../ChoresItem";
import ChoresSettingsForm from "../ChoresSettingsForm";
import DrawItem from "../DrawItem";

import { useWarning } from "../../../../components/elements/Warning.jsx";
import '../choresApp.css';
import axios from "axios";

export default function AddEditMenu({selectedChores, setSelectedChores, calendarMode, setCalendarMode, onNoteSaved}) {
    const [disabledForm, setDisabledForm] = useState('');
    const [showForm, setShowForm] = useState();
    const [showDrawForm, setShowDrawForm] = useState();
    const [showSettingsForm, setShowSettingsForm] = useState();
    const [noteId, setNoteId] = useState();
    const { askWarning } = useWarning();
    const choreIds = Object.keys(selectedChores).filter(key=>selectedChores[key]);

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
            onNoteSaved();
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
        setCalendarMode(mode);
    };

    const isActionRequired = Object.values(selectedChores).filter(Boolean).length;

    return (
        <div>
            <div className={`menu-bar ${disabledForm && ('disabled')}`}>
                <div className="add-edit-menu">
                    <div className="add-edit-menu-icon" title="Add chore" onClick={openForm}><MdStickyNote2 /></div>
                    <div className="add-edit-menu-icon" title="Add drawing" onClick={openDrawForm}><MdDraw /></div>
                    {isActionRequired > 0 && (
                        <div className="add-edit-menu edit-menu ">
                            {choreIds && choreIds.length == 1 && (
                                <div className="edit-menu-one-selected">
                                    <div className="add-edit-menu-icon" title="Show chore" onClick={openForm}><IoEyeSharp /></div>
                                    <div className="add-edit-menu-icon" title="Share chores" onClick={shareChores}><MdShare /></div>
                                </div>
                            )}
                            <div className="add-edit-menu-icon" title="Unselect chores" onClick={() => setSelectedChores([])}> <FaRegSquareMinus /></div>
                            <div className="add-edit-menu-icon" title="Delete chores" onClick={deleteChores}> <MdDelete /></div>
                        </div>
                    )}
                </div>
                <div className="menu-shape-settings">
                    <div className="menu-shape-settings-mode">
                        <div className={`add-edit-menu-icon menu-shape-mode ${calendarMode == 'simple' && ('selected')}`} title="Switch to simple mode" onClick={()=>{switchMode('simple')}}><RiRectangleFill/></div>
                        <div className={`add-edit-menu-icon menu-shape-mode ${calendarMode == 'calendar' && ('selected')}`} title="Switch to calendar" onClick={()=>{switchMode('calendar')}}><CiCalendarDate/></div>
                        <div className={`add-edit-menu-icon menu-shape-mode ${calendarMode == 'todolist' && ('selected')}`} title="Switch to ToDo list" onClick={()=>{switchMode('todolist')}}><CiBoxList/></div>
                    </div>
                    <div className="add-edit-menu-icon" title="Settings" onClick={openSettingsForm}><IoIosSettings /></div>
                </div>
            </div>
            {showForm && (<ChoresItem 
                noteId={noteId} 
                onClose={closeForm} 
                onNoteSaved={onNoteSaved} 
            />)}
            {showDrawForm && (<DrawItem onClose={closeDrawForm} />)}
            {showSettingsForm && (<ChoresSettingsForm onClose={closeSettingsForm} />)}
        </div>
    );
}