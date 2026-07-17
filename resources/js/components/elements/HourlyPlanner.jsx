import React, { useEffect, useState, useRef } from "react";

import "./HourlyPlanner.css";
import { IoIosCloseCircle } from "react-icons/io";

import { formatDateTime } from "../../utils/date";
import QuickAddForm from "./QuickAddForm";

export default function HourlyPlanner({items, day, onClose, onSave}) {
    const cursorRef = useRef(null);
    const plannerRef = useRef(null);
    const [quickAddPosition, setQuickAddPosition] = useState({
        top: 0,
        left: 0,
    });
    const [isOpened, setIsOpened] = useState(null);
    const [addFormParams, setAddFormParams] = useState(null);

    const topStep = 50;
    const currentTime = new Date();
    const hh = Number(currentTime.getHours());
    const mm = Number(currentTime.getMinutes());
    const currentTimeTop = (topStep * hh) + mm; 
    

    const createItem = (e) => {
       
        // 25px - element of datum
        const pixels = (e.clientY - e.currentTarget.getBoundingClientRect().top + e.currentTarget.scrollTop - 25) ;
        
        const hour = Math.floor(pixels / topStep);
        const minutes = ((pixels / topStep) - hour) < 0.5 ? "00" : "30";

        const currentPositionY = e.clientY - e.currentTarget.getBoundingClientRect().top;
        const currentPositionX = e.clientX - e.currentTarget.getBoundingClientRect().left; 
        
        setQuickAddPosition({
            top: `${currentPositionY}px`,
            left: `${currentPositionX}px`,
        })
        setIsOpened(true);
        setAddFormParams({
            day: day,
            hour: hour,
            minutes: minutes,
        });
    };

    function changeCursorPosition(e) {
        if (!cursorRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top + e.currentTarget.scrollTop;

        cursorRef.current.style.top = `${y}px`;
    }

    function closeForm() {
        onClose();
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

            let elementTop = (topStep * (hour-1)) + 15 + minute;
            let i = 1;
            for(let element of items[itemsKey]) {    
                hourPosition[hour].push(element);
                let elementHeight = topStep || element?.duration;
                elements.push(
                    <div className="hourly-planner-element" 
                        key={itemsKey+"-"+i} 
                        style={{
                            height:elementHeight,
                            top:elementTop,
                            left:((hourPosition[hour].length) * 75)-35,
                            width:"75px",
                            backgroundColor:element.color,
                        }} 
                        onClick={()=>selectItem(element)}
                    >
                        <div>{itemsKey}</div> 
                        <div className="hourly-planner-element-title">{element.title}</div> 
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
                    <div className="hourly-planner-body" 
                        style= {{
                            height:topStep,
                        }}
                    >
                        <div className="hourly-planner-half-hour hourly-planner-half-hour-1"></div>
                        <div className="hourly-planner-half-hour hourly-planner-half-hour-2"></div>
                    </div>
                </div>
            )
        }


        return rows;   
    }

    useEffect(() => {
        if(!items) return;

        if(plannerRef.current) {
            plannerRef.current.scrollTop = Math.max(0, currentTimeTop-topStep);
        }

    },[items]);
    return (
        <div className="hourly-planner">
            <div className="close-planner" onClick={()=>closeForm()}>
                <IoIosCloseCircle />
            </div>
            <div className="hourly-planner-title">{formatDateTime(day, 'date')}</div>
            <div className="hourly-planner-grid" 
                onMouseMove={changeCursorPosition} 
                ref={plannerRef}
                onClick={createItem}
            >
                {renderRows()}
                {renderItems(items)}
                <div className="cursor-time-element" ref={cursorRef}></div>
                <div className="cursor-current-time-element" style={{top:currentTimeTop+"px"}}></div>
            </div>
            {isOpened && (
                <div className="quick-add-ref" 
                    style={{
                        left: quickAddPosition.left,
                        top: quickAddPosition.top,
                    }}>
                    <QuickAddForm 
                        params={addFormParams}
                        onSave={onSave}
                    />
                </div>
            )}
        </div>
    );
}