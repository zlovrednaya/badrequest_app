import React, { useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";

import "./Planner.css";
import HourlyPlanner from "./HourlyPlanner";
import { PiXFill } from "react-icons/pi";
export default function Planner({items, currentDate, setCurrentDate}) {
    const now = new Date();
    
    const [selectedDate, setSelectedDay] = useState(now);
    const [selectedItem, setSelectedItem] = useState();
    const [showHourlyPlanner, setShowHourlyPlanner] = useState(false);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'];
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    const days = [];


    function renderDays(currentDate) {
        const cells = [];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const lastDayOfPreviousMonth = new Date(year, month, 0).getDate();

        const daysInMonth = lastDayOfMonth.getDate();
        const startWeekDay = firstDayOfMonth.getDay();

        const showAllItems = (day) => {
            console.log('showAllItems' + day);

            setShowHourlyPlanner(true);

        };

        const selectItem = (id) => {

        };

        const formatDate = (dateString, mode) => {
            const date = new Date(dateString);
            const dd = String(date.getDate()).padStart(2, '0');
            const MM = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();

            return `${yyyy}-${MM}-${dd}`;
        };

        // render previous month days
        for (let i = startWeekDay - 1; i > 0; i--) {
            cells.push(
                <div className="planner-day-cell no-current previous" key={`empty-before-${i}`}>
                    <div className="day-cell-date">{lastDayOfPreviousMonth - i + 1}</div>
                </div>
            );
        }
        // render items

        for (let i = 0; i < daysInMonth; i++) {
            let dayElements = [];
            let day = formatDate(new Date(year, month, i+1));
            
            if (items[day]) {
                let k = 0;
                items[day].forEach(item => {
                    k++;
                    if (k > 4) {
                        return;
                    } 
                    if (k == 4) {
                        dayElements.push(
                            <div className="calendar-item-element show-all" key={i+1} onClick={()=>showAllItems(day)}>
                                show more ..
                            </div>
                        );
                        return;
                    } 

                    let str =  (item.title || item.text || '');
                    dayElements.push(
                        <div className="calendar-item-element" key={i+1} style={{backgroundColor:item.color}} onSelect={()=>selectItem(item.id)}>
                            {str.slice(0, 20)}{(str.length>20)?`...`:``}
                        </div>
                    );
                    
                });
                
            }
            cells.push(
                <div className={`planner-day-cell` + (now.getDate()-1 == i ? " today":"")} key={`day-${i}`}>
                    <div className="day-cell-date">{i+1}</div>
                    <div className="calendar-items-box">{dayElements}
                    </div>
                </div>
            );
        }

        // render next month days
        for (let i = 0; i < 7 - lastDayOfMonth.getDay(); i++) {
            cells.push(
                <div className="planner-day-cell no-current next" key={`empty-after-${i}`}>
                    <div className="day-cell-date">{i+1}</div>
                </div>
            );
        }

        return cells;

    }

    function renderDayItems(items) {
        
    }

    function selectToday() {
        setCurrentDate(new Date());
    }
    function setMonth(step) {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + step, 1);
        setCurrentDate(firstDayOfMonth);
    }

    useState(() => {
        renderDays(currentDate);
    }, [items]);
    
    return (
        <div className="planner">
            <div className="planner-header">
                <div className="current-date">
                    <div className="month">{months[currentMonth]}</div>
                    <div className="year">{currentYear}</div>
                </div>
                
                <div className="navigation-bar">
                    <div className="month-left" onClick={()=>setMonth(-1)}><CiCircleChevLeft /></div>
                    <div className="day-today" onClick={()=>selectToday()}>{selectedDate.toDateString()}</div>
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
            {showHourlyPlanner && (<HourlyPlanner />)}
        </div>
    );
}