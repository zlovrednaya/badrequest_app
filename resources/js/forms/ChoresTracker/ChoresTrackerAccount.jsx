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

import './ChoresTrackerAccount.css';
import './ChoresTrackerForm.css';

export default function ChoresTrackerAccount() {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {askWarning} = useWarning();
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [chores, setChores] = useState([]);
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
        })
    };

    async function onChoreSaved(mode) {
        await loadChores(mode);
    };

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
    };

    const actions = {
        mode: {
            changeCalendarMode: changeCalendarMode
        },
        chore: {
            loadChores: loadChores,
            onChoreSaved: onChoreSaved,
            deleteChores: deleteChores,
        },
    };

    useEffect(() => {
        if (!user) return;
    
        loadChores(calendarMode);
    }, [user, selectedFilter]);

    return (
        <div className="chores-tracker-account">
            <div className="app-form">
                <div className="header-menu">
                    <h1 className="app-name" onClick={()=>navigate('/')}>Chores</h1>
                    <UserMenu />
                </div>
                <div className="chores-tracker-window">
                    <div className="chores-tracker-left-window">
                        <LeftMenu onSelectFilter={setSelectedFilter}/>
                    </div>
                    <div className="chores-tracker-main-window">
                        <AddEditMenu 
                            selectedChores={selectedChores}
                            setSelectedChores={setSelectedChores}  
                            calendarMode={calendarMode} 
                            actions={actions}
                        />
                        {calendarMode !== 'todolist' && (<QuickAddMenu />)}
                        <ChoresList 
                            filter={selectedFilter} 
                            selectedChores={selectedChores} 
                            setSelectedChores={setSelectedChores} 
                            chores={chores}
                            calendarMode={calendarMode}
                            actions={actions} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};