import React from "react";

import "../ChoresList.css";

export default function CalendarMode({chores}) {
    return (
        <div className="chores-list-calendar">calendar
            {
                chores.map((item, key)=>(
                    <div>

                    </div>
                ))
            }
        </div>
    );
}