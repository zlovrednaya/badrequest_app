import React from "react";
import { useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./Calendar.css";

export default function Calendar(){
    const [selected, setSelected] = useState(new Date());
    return (
        <DayPicker
            animate
            mode="single"
            selected={selected}
            onSelect={setSelected}
            classNames={{
                today: `border-amber-500`, // Add a border to today's date
               // selected: `selected-day`, // Highlight the selected day
            }}
    />
    );
}