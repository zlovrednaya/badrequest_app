import React, { useEffect, useState, useRef } from "react";

import "./HourlyPlanner.css";
import { IoIosCloseCircle } from "react-icons/io";


export default function HourlyPlanner({items, day}) {
    const currentTime = new Date();
    const cursorRef = useRef(null);

    const createItem = (hour) => {
        console.log('createItem: ' + hour);
    };

    function changeCursorPosition(e) {
        if (!cursorRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();

        const y = e.clientY - rect.top;

        cursorRef.current.style.top = `${y}px`;
    }

    function closeForm() {

    }

    function selectItem(item) {

    }
    
    function renderItems(items) {
        const elements = [];
        const width = 20;
        const hourPosition = [];
        for(let itemsKey in items) {
            const [hour, minute] = itemsKey.split(":").map(Number);
            if(!hourPosition[hour])hourPosition[hour] = [];

            let elementTop = (30 * (hour-1)) + 15 + minute;
            let i = 1;
            for(let element of items[itemsKey]) {    
                hourPosition[hour].push(element);
                let elementHeight = 30 || element?.duration;
                elements.push(
                    <div className="hourly-planner-element" 
                        key={itemsKey+"-"+i} 
                        style={{
                            height:elementHeight,
                            top:elementTop,
                            left:((hourPosition[hour].length) * 75),
                            width:"75px",
                            backgroundColor:element.color
                        }} 
                        onClick={()=>selectItem(element)}
                    >
                        {itemsKey} {element.title}
                    </div>
                );
                
                i++;
            }
        }
        return elements;
    }
    function renderRows() {
        const rows = [];
        
        for(let i = 0; i < 24; i++)
        {
            rows.push(
                <div className="hourly-planner-row" key={`hour-${i}`}>
                    <div className="hourly-planner-hour">{i}:00</div>
                    <div className="hourly-planner-body">
                        <div className="hourly-planner-half-hour hourly-planner-half-hour-1" onClick={() => createItem(i)}></div>
                        <div className="hourly-planner-half-hour hourly-planner-half-hour-2" onClick={() => createItem(i+":30")}></div>
                    </div>
                </div>
            )
        }


        return rows;   
    }

    useEffect(() => {
        if(!items) return;
    },[items]);
    return (
        <div className="hourly-planner">
            <div className="close-planner" onClick={()=>closeForm()}>
                <IoIosCloseCircle />
            </div>
            <div className="hourly-planner-title">{day}</div>
            <div className="hourly-planner-grid" onMouseMove={changeCursorPosition}>
                {renderRows()}
                {renderItems(items)}
                <div className="cursor-time-element" ref={cursorRef}></div>
            </div>
        </div>
    );
}