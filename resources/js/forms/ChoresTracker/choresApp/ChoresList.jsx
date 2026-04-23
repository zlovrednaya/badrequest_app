import React, { useState, useEffect }  from "react";

import { LuClock } from "react-icons/lu";
import { SlStar } from "react-icons/sl";


import './ChoresList.css';
export default function ChoresList() {
    const [chores, setChores] = useState([]);

    async function loadChores() {
        axios( window.location.origin+'/chores/getList', {
            method: 'POST', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        })
        .then(res => {
            debugger;
            setChores(res.data);
        })
    };
    useEffect(() => {
        loadChores();
    }, []);

    return (
        <div className="chores-list">
            {
                chores.map(choreItem => (
                    <div className="choreItemMain">
                        <div className="chore-item" style={{backgroundColor:choreItem.color}}>
                            <div className="chore-item-title">{choreItem.title}</div>
                            <div className="chore-item-text">
                                
                                {choreItem.text}
                            </div>
                            {choreItem.due_datetime && (
                                <div className="chore-item-date">
                                    <LuClock />
                                    <span>{choreItem.due_datetime}</span>
                                </div>
                            )} 
                            
                        </div>
                        {choreItem.cost && (
                            <div className="chore-item-cost">
                                <SlStar /> 
                                <div >{choreItem.cost}</div>
                            </div>
                        )}
                    </div>
                ))
            }
        </div>
    );
}