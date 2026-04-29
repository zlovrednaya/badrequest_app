import React from "react";

import { SlStar } from "react-icons/sl";
import { PiGreaterThanLight } from "react-icons/pi";


import './QuickAddMenu.css';

export default function QuickAddMenu() {
    const defaultChoreList = [
        {  
            'name': 'Cleaning',
            'cost': 5,
        },
        {
            'name': 'Schedule an appointment',
            'cost': null,
        }
    ];

    return (
        <div className="quick-add-menu">
            <span>Quick add </span>
            <PiGreaterThanLight />
            {defaultChoreList.map((chore, i) => (
                <div className="quick-add-item" key={i}>
                    <div className="item-name">{chore.name}</div>
                    {chore.cost && (<div className="quick-item-cost">
                        <div className="item-cost-star">
                            <SlStar />
                        </div>
                        <div>{chore.cost}</div>
                    </div>)}
                </div>
            ))}
        </div>
    );
}