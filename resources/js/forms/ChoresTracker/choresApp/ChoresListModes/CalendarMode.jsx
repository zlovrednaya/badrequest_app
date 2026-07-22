import React, {useState, useEffect} from "react";

import Planner from "../../../../components/elements/Planner";
import "../ChoresList.css";

export default function CalendarMode({items, getCalendarChores, currentDate, setCurrentDate, onSave, appSettings, refreshCalendar}) {
    
    // add into onsave update of calendarmode
    async function saveChore(formData) {
        console.log('save chore calendar mode');
        await onSave(formData);

    }
   useEffect(()=>{
    if (!currentDate) return;
       getCalendarChores(currentDate);
    }, [currentDate]);
    return (
        <div className="chores-list-calendar">
            {
                <Planner 
                    items={items}
                    currentDate = {currentDate}
                    setCurrentDate = {setCurrentDate}    
                    onSave = {saveChore}
                />
            }
        </div>
    );
}