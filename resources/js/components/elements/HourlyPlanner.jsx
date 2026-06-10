import React from "react";

import "./HourlyPlanner.css";

export default function HourlyPlanner({items}) {
    const createItem = (hour) => {
        console.log('createItem: ' + hour);
    };

    const rows = [];
    for(let i = 0; i<24; i++)
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
    return (
        <div className="hourly-planner">
            {rows}
        </div>
    );
}