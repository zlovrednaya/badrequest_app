import React, {useState, useEffect} from "react";

import Planner from "../../../../components/elements/Planner";
import "../ChoresList.css";

export default function CalendarMode({onSave}) {
    const now = new Date();
    const [currentDate, setCurrentDate] = useState(now);
    const [chores, setChores] = useState([]);
    const getChores = async () => {
        axios('/chores/getAllForCalendar' , {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
            data: JSON.stringify({
                date: currentDate,
            }),
        })
        .then(res => {
            
            setChores(res.data);
        })
        .catch(() => {
            debugger;
        })
    };

    useEffect(()=>{
        getChores();
    }, [currentDate]);
    return (
        <div className="chores-list-calendar">
            {
                <Planner 
                    items={chores}
                    currentDate = {currentDate}
                    setCurrentDate = {setCurrentDate}    
                    onSave = {onSave}
                />
            }
        </div>
    );
}