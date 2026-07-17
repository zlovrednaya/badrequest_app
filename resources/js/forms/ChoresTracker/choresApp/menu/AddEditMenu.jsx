import React, { useState, useEffect } from "react";

import { MdAddCircleOutline } from "react-icons/md";
import { MdStickyNote2 } from "react-icons/md";

import { MdDraw } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegSquareMinus } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";
import { MdApps } from "react-icons/md";
import { FaPenFancy } from "react-icons/fa6";


import { MdShare } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { RiRectangleFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";

import QuickAddMenu from "./QuickAddMenu.jsx";
import ChoresItem from "../item/ChoresItem.jsx";
import DrawItem from "../item/DrawItem.jsx";
import ToDoItem from "../item/ToDoItem.jsx";
import ChoresSettingsForm from "../ChoresSettingsForm";
import SaveBatch from "../../SaveBatch.jsx";


import { useWarning } from "../../../../components/elements/Warning.jsx";
import '../choresApp.css';
import axios from "axios";

export default function AddEditMenu({chores, selectedChores, calendarMode, actions, appSettings}) {
    const [choreId, setChoreId] = useState(null);
    
    const choreIds = Object.keys(selectedChores).filter(key=>selectedChores[key]);

    const editChore = async (id) => {
        console.log(id);
        setChoreId(id);
        listActions.form.openForm("ChoresItem");
    };

    const shareChores = async (mode) => {
        let choreIds = {};
        if(mode === 'todolist') {
            choreIds = chores.map(chore => chore.id);
        } else {
            choreIds = Object.keys(selectedChores).filter(key=>selectedChores[key]);
        }
        
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

    const shareTelegramChores = async (mode) => {
        const choreIds = (mode === "todolist") ? chores.map(chore => chore.id) : Object.keys(selectedChores).filter(key=>selectedChores[key]);

        await axios('/chores/shareTelegramChores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            data: {
                ids: choreIds,
                mode: mode,
            },
        })
        .then((res) => {
            debugger;
        })
        .catch((err) => {
            debugger;
        })
    }

    const switchMode = (mode) => {
        actions.mode.changeCalendarMode(mode);
        actions.chore.setSelectedChores([]);
    };

    const listActions = {
        ...actions,
        chore: {
            ...actions.chore,
            shareChores,
            shareTelegramChores,
            setChoreId,
        },
    };

    const isActionRequired = Object.values(selectedChores).filter(Boolean).length;

    return (
        <div className={`add-edit-menu-window ${appSettings.calendarMode}`}>
            <div className={`menu-bar ${appSettings.formState.disabledForm && ('disabled')}`}>
                <div className={`add-edit-menu ${appSettings.calendarMode}`}>
                    {appSettings.calendarMode === 'simple' && (
                            <QuickAddMenu 
                                onSave={listActions.chore.saveChore} 
                             />
                        
                    )}
                    {appSettings.calendarMode === 'todolist' && (
                        <div className="add-edit-menu">
                            <div className="add-edit-menu-icon button-left-icon" title="Share ToDo list" onClick={() => shareTelegramChores('todolist')}>
                                <MdShare />
                                <span>Share list</span>
                            </div>
                            <SaveBatch actions={listActions}  />
                        </div>
                    )}
                    
                    {isActionRequired > 0 && (
                        <div className="add-edit-menu edit-menu ">
                            {choreIds && choreIds.length == 1 && (
                                <div className="edit-menu-one-selected">
                                    <div className="add-edit-menu-icon" title="Show chore" onClick={() => editChore(choreIds[0])}><IoEyeSharp /></div>
                                    <div className="add-edit-menu-icon" title="Share chores" onClick={() => listActions.chore.shareChores()}><MdShare /></div>
                                    <div className="add-edit-menu-icon" title="Share to telegram" onClick={() => listActions.chore.shareTelegramChores()}><FaPaperPlane /></div>
                                </div>
                            )}
                            <div className="add-edit-menu-icon" title="Unselect chores" onClick={() => listActions.chore.setSelectedChores([])}> <FaRegSquareMinus /></div>
                            <div className="add-edit-menu-icon" title="Delete chores" onClick={()=>listActions.chore.deleteChores()}> <MdDelete /></div>
                        </div>
                    )}
                </div>
                <div className="menu-shape-settings">
                    <div className="menu-shape-settings-mode">
                        <div className={`add-edit-menu-icon menu-shape-mode ${appSettings.calendarMode == 'simple' && ('selected')}`} title="Switch to simple mode" onClick={()=>{switchMode('simple')}}><MdApps/></div>
                        <div className={`add-edit-menu-icon menu-shape-mode ${appSettings.calendarMode == 'calendar' && ('selected')}`} title="Switch to calendar" onClick={()=>{switchMode('calendar')}}><CiCalendarDate/></div>
                        <div className={`add-edit-menu-icon menu-shape-mode ${appSettings.calendarMode == 'todolist' && ('selected')}`} title="Switch to ToDo list" onClick={()=>{switchMode('todolist')}}><CiBoxList/></div>
                    </div>
                    <div className="add-edit-menu-icon" title="Settings" onClick={() => listActions.form.openForm("ChoresSettingsForm")}><IoIosSettings /></div>
                </div>
            </div>
            {appSettings.formState.activeForm === "ChoresItem" && (<ChoresItem 
                choreId={choreId} 
                actions={listActions} 
            />)}
            {appSettings.formState.activeForm === "DrawItem" && (<DrawItem 
                actions={listActions} 
            />)}
            {appSettings.formState.activeForm === "ChoresSettingsForm" && (<ChoresSettingsForm 
                actions={listActions}
                settings={appSettings}
                />)}
            {appSettings.calendarMode == "todolist" && (<ToDoItem 
                actions={listActions} 
            />)}
        </div>
    );
}