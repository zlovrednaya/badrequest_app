import React, {useState, useEffect} from "react";

import Planner from "../../../../components/elements/Planner.tsx";
import "../ChoresList.css";
type CalendarModeProps = {
    items: any[],
    getCalendarChores: (currentDate: Date | string) => Promise<void>,
    currentDate: Date | string,
    setCurrentDate: (date: Date | string) => void,
    onSave: (formData: any) => Promise<void>,
    appSettings: any,
    refreshCalendar: () => void
};
export default function CalendarMode({items, getCalendarChores, currentDate, setCurrentDate, onSave, appSettings, refreshCalendar}: CalendarModeProps) {
    
    // add into onsave update of calendarmode
    async function saveChore(formData: any) {
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