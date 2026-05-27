import React from "react";

import Planner from "../../../../components/elements/Planner";
import "../ChoresList.css";

export default function CalendarMode({chores}) {
    return (
        <div className="chores-list-calendar">
            {
                <Planner items={chores}/>
            }
        </div>
    );
}