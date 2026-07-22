import React, { useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import { formatDateTime } from "../../utils/date.ts";

import "./Planner.css";
import HourlyPlanner from "./HourlyPlanner";
import { PiXFill } from "react-icons/pi";
export default function Planner({items, currentDate, setCurrentDate, onSave}) {
    const now = new Date();
    const [selectedDate, setSelectedDay] = useState(now);
    const [selectedItem, setSelectedItem] = useState();
    const [showHourlyPlanner, setShowHourlyPlanner] = useState(false);
    const [dayForHourlyPlanner, setDayForHourlyPlanner] = useState(null);
    const itemsDay = items?.[dayForHourlyPlanner] ?? [];
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    const days = [];

    function openHourlyPlanner(day, monthStep = 0) {
        console.log(`openHourlyCalendar ${day} ${monthStep}`);
        const showDate = formatDateTime(new Date(currentYear, currentMonth + Number(monthStep), day),'datewithdash');
        setDayForHourlyPlanner(showDate);
        setShowHourlyPlanner(true);
    }
    function closeHourlyPlanner() {
        setShowHourlyPlanner(false);
    }
    function renderDays(currentDate) {
        const cells = [];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const lastDayOfPreviousMonth = new Date(year, month, 0).getDate();

        const daysInMonth = lastDayOfMonth.getDate();
        const startWeekDay = (firstDayOfMonth.getDay() + 6) % 7; // normalize week - Monday is 0

        const showAllItems = (day) => {
            console.log('showAllItems' + day);

            setShowHourlyPlanner(true);
            setDayForHourlyPlanner(day);
        };

        const selectItem = (id) => {

        };


        // render previous month days
        if (startWeekDay != 0){
            for (let i = startWeekDay; i > 0; i--) {
                let showDay = lastDayOfPreviousMonth - i + 1;
                cells.push(
                    <div className="planner-day-cell no-current previous" key={`empty-before-${i}`}>
                        <div className="day-cell-date" onClick={() => {openHourlyPlanner(showDay,'-1')}}>{showDay}</div>
                    </div>
                );
            }
        }
        // render items

        for (let i = 0; i < daysInMonth; i++) {
            let dayElements = [];
            let day = formatDateTime(new Date(year, month, i+1), 'datewithdash');
            
            if (items[day]) {
                let k = 0;
                for(let itemHours in items[day]) {
                    for(let itemIndex in items[day][itemHours]) {
                        let item = items[day][itemHours][itemIndex];
                        k++;
                        if (k > 4) {
                            continue;
                        } 
                        if (k == 4) {
                            dayElements.push(
                                <div className="calendar-item-element show-all" key={"show-more-" + (i+1)} onClick={()=>showAllItems(day)}>
                                    show more ..
                                </div>
                            );
                            continue;
                        } 

                        let str =  (item.title || item.text || '');
                        dayElements.push(
                            <div className="calendar-item-element" key={"item-element-" + item.id + (i+1)} style={{backgroundColor:item.color}} onSelect={()=>selectItem(item.id)}>
                                {str.slice(0, 20)}{(str.length>20)?`...`:``}
                            </div>
                        );
                    }
                }
            }
            cells.push(
                <div className={`planner-day-cell` + (now.getDate()-1 == i ? " today":"")} key={`day-${i}`}>
                    <div className="day-cell-date" onClick={() => {openHourlyPlanner(i+1,'0')}}>{i+1}</div>
                    <div className="calendar-items-box">{dayElements}
                    </div>
                </div>
            );
        }

        // render next month days
        const daysToAdd = 7-lastDayOfMonth.getDay()%7;
        
        for (let i = 1; i <= daysToAdd; i++) {
            cells.push(
                <div className="planner-day-cell no-current next" key={`empty-after-${i}`}>
                    <div className="day-cell-date" onClick = {() => {openHourlyPlanner(i,'+1')}}>{i}</div>
                </div>
            );
        
        }
        

        return cells;

    }


    //// whether i need to refresh hourly planner 
    async function onSaveItems (formData) {
        await onSave(formData);

        // update hourly planner
        //setItemsDay(items[dayForHourlyPlanner]);
    }

    function selectToday() {
        setCurrentDate(new Date());
    }
    function setMonth(step) {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + step, 1);
        setCurrentDate(firstDayOfMonth);
    }

    useState(() => {
        //renderDays(currentDate);
    }, [items]);
    
    return (
        <div className="planner">
            <div className="planner-header">
                <div className="current-date">
                    <div className="month">{months[currentMonth]}</div>
                    <div className="year">{currentYear}</div>
                </div>
                
                <div className="navigation-bar">
                    <div className="navigation-bar-button month-left" onClick={()=>setMonth(-1)}><CiCircleChevLeft /></div>
                    <div className="navigation-bar-button-text day-today" onClick={()=>selectToday()}>Today - {selectedDate.toDateString()}</div>
                    <div className="navigation-bar-button month-right" onClick={()=>setMonth(+1)}><CiCircleChevRight /></div>
                </div>
            </div>
            <div className="planner-body">
                <div className="planner-body-weekdays">
                    {weekdays.map((days, i) => (
                        <div className={`weekday ` + (i>4 ? `weekend`:`day`)} key={"weekday-" + i}>
                            {days}
                        </div>
                    ))}
                </div>
                <div className="planner-body-days">
                    {renderDays(currentDate)}
                </div>
            </div>
            {showHourlyPlanner && (
                <HourlyPlanner 
                    items={itemsDay}
                    day={dayForHourlyPlanner}
                    onClose={closeHourlyPlanner}
                    onSave={onSaveItems}
                />
            )}
        </div>
    );
}
