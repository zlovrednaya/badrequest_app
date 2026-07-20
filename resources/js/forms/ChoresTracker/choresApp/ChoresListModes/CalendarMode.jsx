import React, {useState, useEffect} from "react";

import Planner from "../../../../components/elements/Planner";
import "../ChoresList.css";

export default function CalendarMode({chores, getCalendarChores, currentDate, setCurrentDate, onSave, appSettings, refreshCalendar}) {
    
    // add into onsave update of calendarmode
    async function saveChore(formData) {
        await onSave(formData);
        await getChores(currentDate);
    }
   useEffect(()=>{
       getCalendarChores(currentDate);
    }, [currentDate]);
    return (
        <div className="chores-list-calendar">
            {
                <Planner 
                    items={chores}
                    currentDate = {currentDate}
                    setCurrentDate = {setCurrentDate}    
                    onSave = {saveChore}
                />
            }
        </div>
    );
}