import React, { useEffect } from "react";
import './ThreeDaysPlanner.css';

import { formatDateTime } from "../../utils/date";
export default function ThreeDaysPlanner({days})
{
    useEffect(()=>{
        if(!days) return;
    });
    return (
        <div className="three-days-planner">
            {days && Object.entries(days).map(([day, items]) => (
                <div className="three-days-day"> 
                    <div className="three-days-day-title">
                        <span>{formatDateTime(day)}</span>
                    </div>
                    {
                        items.map((item) => (
                            <div className="three-days-item">
                                <div className="three-days-item-date">
                                    {formatDateTime(item.due_datetime, 'time')}
                                </div>
                                <div className="three-days-item-info">
                                    <span className="three-days-item-title">{item.title}</span>
                                    <span className="three-days-item-text">{item.text}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    );
}