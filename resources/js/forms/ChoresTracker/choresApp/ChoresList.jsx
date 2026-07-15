import React, { useState, useEffect }  from "react";

import { LuClock } from "react-icons/lu";
import { SlStar } from "react-icons/sl";

import SimpleMode from "./ChoresListModes/SimpleMode";
import TodoListMode from "./ChoresListModes/TodoListMode";
import CalendarMode from "./ChoresListModes/CalendarMode";

import './ChoresList.css';

export default function ChoresList({chores, selectedChores, actions, appSettings}) {

    function selectItem(itemKey) {
        actions.chore.setSelectedChores((prev) => ({
            ...prev,
            [itemKey]: !prev[itemKey]
        }));
    }

    const editChore = () => {
        console.log('edit');
    }

    const listActions = {
        ...actions,
        selection: {
            selectItem,
        },
        chore: {
            ...actions.chore,
            editChore,
        }
    }

    useEffect(() => {
        console.log('load chores list. calendarmode is ' + appSettings.calendarMode);
        
        if(!appSettings.calendarMode) return;

        switch(appSettings.calendarMode) {
            case 'simple':
            case 'todolist':
                actions.chore.loadChores(appSettings.calendarMode);
                break;
            case 'calendar':
                break;    
        }

        actions.amount.updateAmount();
        
    }, [appSettings.selectedFilter, appSettings.calendarMode]);

    return (
        <div className="chores-list">
            {appSettings.calendarMode === 'simple' &&
                <SimpleMode 
                    chores={chores} 
                    selectedChores={selectedChores}
                    actions={listActions}
                    appSettings={appSettings} 
                />
            }
            {appSettings.calendarMode === 'todolist' &&
                <TodoListMode 
                    chores={chores}
                    selectedChores={selectedChores}
                    actions={listActions}
                    appSettings={appSettings} 
                />
            }
            {appSettings.calendarMode === 'calendar' &&
                <CalendarMode 
                    chores={chores}
                    actions={listActions}
                    appSettings={appSettings} 
             />
            }
        </div>
    );
}