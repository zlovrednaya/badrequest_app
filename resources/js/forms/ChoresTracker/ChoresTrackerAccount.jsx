import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useSortable } from '@dnd-kit/react/sortable';

import ChoresList from './choresApp/ChoresList';
import AddEditMenu from './choresApp/menu/AddEditMenu';
import LeftMenu from "./choresApp/menu/LeftMenu";
import QuickAddMenu from './choresApp/menu/QuickAddMenu';
import UserMenu from './user/UserMenu';

import './ChoresTrackerAccount.css';
import './ChoresTrackerForm.css';

export default function ChoresTrackerAccount() {
    const {user} = useAuth();
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [chores, setChores] = useState([]);
    const [selectedChores, setSelectedChores] = useState({});
    const [calendarMode, setCalendarMode] = useState('simple');

    const changeCalendarMode = (mode) => {
        setCalendarMode(mode);
        loadChores(mode);
    }
    async function loadChores(mode) {
        let url = window.location.origin + '/chores/getList';

        const params = new URLSearchParams();
        if(selectedFilter) {
            params.append("column", selectedFilter.column);
            params.append("filterWord", selectedFilter.filterWord);
        }
        if(mode === 'todolist') {
            params.append("istodo", "true");
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

    useEffect(() => {
        if (!user) return;
    
        loadChores(calendarMode);
    }, [user, selectedFilter]);

    return (
        <div className="chores-tracker-account">
            <div className="app-form">
                <div className="header-menu">
                    <h1 className="app-name">Chores</h1>
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
                            changeCalendarMode={changeCalendarMode}
                            onNoteSaved={loadChores}
                        />
                        {calendarMode !== 'todolist' && (<QuickAddMenu />)}
                        <ChoresList 
                            filter={selectedFilter} 
                            selectedChores={selectedChores} 
                            setSelectedChores={setSelectedChores} 
                            chores={chores}
                            calendarMode={calendarMode}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};