import React, { useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";

import "./Planner.css";
export default function Planner(items) {
    const now = new Date();
    const [currentDate, setCurrentDate] = useState(now);
    const [selectedDate, setSelectedDay] = useState(now);
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'];
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    const days = [];

    function setMonth(step) {
        
    }
    function renderDays(currentDate) {
        const cells = [];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const lastDayOfPreviousMonth = new Date(year, month, 0).getDate();

        const daysInMonth = lastDayOfMonth.getDate();
        const startWeekDay = firstDayOfMonth.getDay();

        // render previous month days
        for (let i = startWeekDay; i > 0; i--) {
            cells.push(
                <div className="planner-day-cell no-current previous" key={i}>
                    <div className="day-cell-date">{lastDayOfPreviousMonth - i + 1}</div>
                </div>
            );
        }
        // render current days
        for (let i = 0; i < daysInMonth; i++) {
            cells.push(
                <div className={`planner-day-cell` + (now.getDate()-1 == i ? " today":"")} key={i}>
                    <div className="day-cell-date">{i+1}</div>
                </div>
            );
        }

        // render next month days
        for (let i = 0; i < 6 - lastDayOfMonth.getDay();i++) {
            cells.push(
                <div className="planner-day-cell no-current next" key={i}>
                    <div className="day-cell-date">{i+1}</div>
                </div>
            );
        }

        return cells;

    }

    function renderDayItems(items) {

    }
    
    return (
        <div className="planner">
            <div className="planner-header">
                <div className="month"></div>
                <div className="navigation-bar">
                    <div className="month-left" onClick={()=>setMonth(-1)}><CiCircleChevLeft /></div>
                    <div className="day-today">{selectedDate.toDateString()}</div>
                    <div className="month-right" onClick={()=>setMonth(+1)}><CiCircleChevRight /></div>
                </div>
            </div>
            <div className="planner-body">
                <div className="planner-body-weekdays">
                    {weekdays.map((days, i) => (
                        <div className={`weekday ` + (i>4 ? `weekend`:`day`)} key={i}>
                            {days}
                        </div>
                    ))}
                </div>
                <div className="planner-body-days">
                    {renderDays(currentDate)}
                </div>
            </div>
        </div>
    );
}