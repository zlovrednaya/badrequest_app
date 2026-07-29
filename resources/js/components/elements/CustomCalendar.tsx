import React, { useState } from "react";
import "./Calendar.css";
import { FaCaretLeft } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa6";


export default function CustomCalendar() {
    const [currentDate, setCurrentDate] = useState();
    const [selectedDay, setSelectedDay] = useState(null);
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'];
    

    return (
        <div className="custom-calendar">
            <div className="calendar-header">
                <div className="switch-left"></div>
                <div className="calendar-month"><FaCaretLeft /></div>
                <div className="switch-right"><FaCaretRight /></div>
            </div>
            <div className="calendar-day">

            </div>
        </div>
    );
}
