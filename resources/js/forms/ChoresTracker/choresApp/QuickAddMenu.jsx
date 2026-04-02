import React from "react";

import { IoIosStarOutline } from "react-icons/io";

import './QuickAddMenu.css';

export default function QuickAddMenu() {
    const defaultChoreList = [
        {  
            'name': 'Mopping',
            'cost': 5,
        },
        {
            'name': 'Schedule an appointment',
            'cost': 0,
        }
    ];

    return (
        <div className="quick-add-menu">
            {defaultChoreList.map((chore) => (
                <div className="quick-add-item">
                    <div className="item-name">{chore.name}</div>
                    {chore.cost && (<div className="item-cost">
                        <div className="item-cost-star">
                            <IoIosStarOutline />
                        </div>
                        <div>{chore.cost}</div>
                    </div>)}
                    
                </div>
            ))}
        </div>
    );
}