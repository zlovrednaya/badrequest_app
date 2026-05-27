import React, { useState } from "react";

import { SlStar } from "react-icons/sl";
import { IoIosAddCircleOutline } from "react-icons/io";

import './QuickAddMenu.css';

export default function QuickAddMenu() {
    const [showList, setShowList] = useState(false);
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
            <IoIosAddCircleOutline />
            <input
                type="text"
                name="text"
                className="quick-item-form-text"
                placeholder="Add a chore ..."
            />
            {showList && (
                defaultChoreList.map((chore, i) => (
                    <div className="quick-add-item" key={i}>
                        <div className="item-name">{chore.name}</div>
                        {chore.cost && (<div className="quick-item-cost">
                            <div className="item-cost-star">
                                <SlStar />
                            </div>
                            <div>{chore.cost}</div>
                        </div>)}
                    </div>
                ))
            )}
        </div>
    );
}