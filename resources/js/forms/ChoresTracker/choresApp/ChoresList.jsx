import React, { useState, useEffect }  from "react";

import { LuClock } from "react-icons/lu";
import { SlStar } from "react-icons/sl";

import SimpleMode from "./ChoresListModes/SimpleMode";
import TodoListMode from "./ChoresListModes/TodoListMode";
import CalendarMode from "./ChoresListModes/CalendarMode";

import './ChoresList.css';

export default function ChoresList({chores, selectedChores, setSelectedChores, calendarMode, actions, appSettings}) {

    function selectItem(itemKey) {
        setSelectedChores((prev) => ({
            ...prev,
            [itemKey]: !prev[itemKey]
        }));
    }

    const editChore = () => {
        console.log('edit');
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const MM = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();

        return `${dd}.${MM}.${yyyy} ${hh}:${mm}`;
    };

    const listActions = {
        ...actions,
        format: {
            formatDate,
        },
        selection: {
            selectItem,
        },
        chore: {
            ...actions.chore,
            editChore,
        }
    }

    return (
        <div className="chores-list">
            {calendarMode === 'simple' &&
                <SimpleMode 
                    chores={chores} 
                    selectedChores={selectedChores}
                    actions={listActions}
                    appSettings={appSettings} 
                />
            }
            {calendarMode === 'todolist' &&
                <TodoListMode 
                    chores={chores}
                    selectedChores={selectedChores}
                    setSelectedChores={setSelectedChores}
                    actions={listActions}
                    appSettings={appSettings} 
                />
            }
            {calendarMode === 'calendar' &&
                <CalendarMode 
                    chores={chores}
                    actions={listActions}
                    appSettings={appSettings} 
             />
            }
        </div>
    );
}