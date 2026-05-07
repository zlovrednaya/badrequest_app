import React, { useState, useEffect }  from "react";

import { LuClock } from "react-icons/lu";
import { SlStar } from "react-icons/sl";

import SimpleMode from "./ChoresListModes/SimpleMode";
import TodoListMode from "./ChoresListModes/TodoListMode";
import CalendarMode from "./ChoresListModes/CalendarMode";

import './ChoresList.css';

export default function ChoresList({chores, selectedChores, setSelectedChores, calendarMode, onNoteSaved}) {

    function selectItem(itemKey) {
        setSelectedChores((prev) => ({
            ...prev,
            [itemKey]: !prev[itemKey]
        }));
    }

    const editItem = () => {
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

    return (
        <div className="chores-list">
            {calendarMode === 'simple' &&
                <SimpleMode 
                    chores={chores} 
                    selectedChores={selectedChores}
                    formatDate={formatDate}
                    selectItem={selectItem}
                />
            }
            {calendarMode === 'todolist' &&
                <TodoListMode 
                    chores={chores}
                    selectedChores={selectedChores}
                    setSelectedChores={setSelectedChores}
                    formatDate={formatDate}
                    selectItem={selectItem}
                    onNoteSaved={onNoteSaved}
                />
            }
            {calendarMode === 'calendar' &&
                <CalendarMode chores={chores} />
            }
        </div>
    );
}