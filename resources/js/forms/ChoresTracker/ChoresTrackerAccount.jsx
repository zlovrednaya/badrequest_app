import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useSortable } from '@dnd-kit/react/sortable';

import ChoresList from './choresApp/ChoresList';
import AddEditMenu from './choresApp/menu/AddEditMenu';
import LeftMenu from "./choresApp/menu/LeftMenu";
import QuickAddMenu from './choresApp/menu/QuickAddMenu';
import UserMenu from './user/UserMenu';
import { useWarning } from "../../components/elements/Warning";
import { useNavigate } from "react-router-dom";

import { SlStar } from "react-icons/sl";

import './ChoresTrackerAccount.css';
import './ChoresTrackerForm.css';

export default function ChoresTrackerAccount() {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {askWarning} = useWarning();
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [chores, setChores] = useState([]);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [selectedChores, setSelectedChores] = useState({});
    const [calendarMode, setCalendarMode] = useState('simple');

    const changeCalendarMode = (mode) => {
        setCalendarMode(mode);
        loadChores(mode);
    };

    async function loadChores(mode) {
        let url = window.location.origin + '/chores/getList';

        const params = new URLSearchParams();
        if(selectedFilter) {
            params.append("column", selectedFilter.column);
            params.append("filterWord", selectedFilter.filterWord);
        }
        if(mode === 'todolist') {
            params.append("istodo", "true");
            params.append("done", "false");
        }

        url += `?${params.toString()}`;
        console.log("load chores");
        axios(url , {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        })
        .then(res => {
            setChores(res.data);
        });
    };

    async function onChoreSaved(mode) {
        await loadChores(mode);
    };

    function updateAmount() {
        axios('/chores/getAmount' , {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        })
        .then(res => {
            debugger;
            setCurrentAmount(res.data.amount);
        })
    }

    const choreIds = Object.keys(selectedChores).filter(key=>selectedChores[key]);
    const deleteChores = async (ids, needWarning = true) => {
        const toDeleteIds = ids || choreIds;

        if (needWarning) {
            const warningResult = await askWarning({
                title: 'You want to delete selected chores (' + toDeleteIds.length + (toDeleteIds.length > 1? " pcs" : " pc" ) + ')' ,
                message: 'Are you sure?',
                confirmText: 'Yes, delete',
                cancelText: 'No, keep chores'
            });

            if (!warningResult) return;
        }
        
        await axios('/chores/deleteChores', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
            data: JSON.stringify({ids:toDeleteIds}),
        })
        .then((res) => {
            actions.chore.onChoreSaved(calendarMode);
            actions.amount.updateAmount();
            // update selected chores
            setSelectedChores([]);
        })
         .catch(err => {
            console.log(err);
            let errors = err.response.data.errors;
            let errorText = err.response.data.message;
        });
    };

    const appSettings = {
        chores,
        calendarMode,
        selectedFilter,
        currentAmount,
    };

    const actions = {
        mode: {
            changeCalendarMode: changeCalendarMode
        },
        chore: {
            loadChores,
            onChoreSaved,
            deleteChores,
            setSelectedChores
        },
        amount: {
            updateAmount,
        }
    };

    useEffect(() => {
        if (!user) return;
    
        loadChores(calendarMode);

        updateAmount();
    }, [user, selectedFilter]);

    return (
        <div className="chores-tracker-account">
            <div className="app-form">
                <div className="header-menu">
                    <h1 className="app-name" onClick={()=>navigate('/')}>Chores</h1>
                    <UserMenu 
                        appSettings={appSettings}
                    />
                </div>
                <div className="chores-tracker-window">
                    <div className="chores-tracker-left-window">
                        <LeftMenu onSelectFilter={setSelectedFilter}/>
                    </div>
                    <div className="chores-tracker-main-window">
                        <AddEditMenu 
                            chores={chores}  
                            selectedChores={selectedChores}
                            calendarMode={calendarMode} 
                            actions={actions}
                        />
                        {calendarMode == 'simple' && (<QuickAddMenu />)}
                        <ChoresList
                            appSettings={appSettings} 
                            filter={selectedFilter} 
                            selectedChores={selectedChores} 
                            setSelectedChores={setSelectedChores} 
                            chores={chores}
                            calendarMode={calendarMode}
                            actions={actions}
                            appSettings={appSettings}
                        />
                        <div className="chores-tracker-footer">
                            {calendarMode == 'todolist' && (
                                <div className="amount-component">
                                    <span>ToDo list amount:</span> <SlStar /> 
                                    <div>{appSettings.currentAmount.todo_done_amount}</div>
                                </div> 
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};