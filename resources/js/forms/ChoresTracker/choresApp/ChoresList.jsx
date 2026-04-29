import React, { useState, useEffect }  from "react";
import { useAuth } from "../../../auth/useAuth";

import { LuClock } from "react-icons/lu";
import { SlStar } from "react-icons/sl";

import './ChoresList.css';

export default function ChoresList({filter, selectedChores, setSelectedChores}) {
    const {user} = useAuth();
    const [chores, setChores] = useState([]);

    function selectItem(itemKey) {
        setSelectedChores((prev) => ({
            ...prev,
            [itemKey]: !prev[itemKey]
        }));
    }

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

    const editItem = () => {
        console.log('edit');
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const MM = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();

        return `${dd}.${MM}.${yyyy} ${hh}:${mm}`;
    };

    useEffect(() => {
        if (!user) return;

        loadChores();
    }, [user,filter]);

    return (
        <div className="chores-list">
            {
                chores.map((choreItem, i) => (
                    <div className="chore-item-main" key={choreItem.id} onClick={()=>selectItem(choreItem.id)} onDoubleClick={() => editItem()}>
                        <div className={`chore-item ${selectedChores[choreItem.id] === true && "selected"}`} style={{backgroundColor:choreItem.color}}>
                            <div className="chore-item-title">{choreItem.title}</div>
                            <div className="chore-item-text">
                                
                                {choreItem.text}
                            </div>
                            {choreItem.due_datetime && (
                                <div className="chore-item-date">
                                    <LuClock />
                                    <span>{formatDate(choreItem.due_datetime)}</span>
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