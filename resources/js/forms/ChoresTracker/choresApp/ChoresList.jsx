import React, { useState, useEffect }  from "react";
import { useAuth } from "../../../auth/useAuth";

import { LuClock } from "react-icons/lu";
import { SlStar } from "react-icons/sl";

import './ChoresList.css';

export default function ChoresList({filter}) {
    const {user} = useAuth();
    const [chores, setChores] = useState([]);

    async function loadChores() {
        let url = window.location.origin + '/chores/getList';
        if(filter) {
            url +=`?column=${filter.column}&filterWord=${encodeURIComponent(filter.filterWord)}`
        }
        console.log("load chores");
        axios(url , {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        })
        .then(res => {
            setChores(res.data);
        })
    };
    useEffect(() => {
        if (!user) return;

        loadChores();
    }, [user,filter]);

    return (
        <div className="chores-list">
            {
                chores.map((choreItem, i) => (
                    <div className="choreItemMain" key={i}>
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
                        {choreItem.drawing && (
                            <div className="chore-item-drawing">
                                 <img src={choreItem.drawing} alt="preview" />
                                <div ></div>
                            </div>
                        )}
                    </div>
                ))
            }
        </div>
    );
}