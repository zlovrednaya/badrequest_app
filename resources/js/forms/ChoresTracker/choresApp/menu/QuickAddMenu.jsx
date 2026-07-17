import React, { useState } from "react";

import { SlStar } from "react-icons/sl";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineEnter } from "react-icons/ai";


import './QuickAddMenu.css';

export default function QuickAddMenu({onSave}) {
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

    const baseFormState = {
            text: "",
    };

    const [formData, setFormData] = useState(baseFormState);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    function handleSave(e) {
        onSave(formData);
        setFormData(baseFormState);
    };

    function onKeyUp(e) {
        if(e.which != 13) return;
        handleSave();
    }

    return (
        <div className="quick-add-menu" onKeyUp={onKeyUp}>
            <IoIosAddCircleOutline />
            <input
                type="text"
                name="text"
                className="quick-item-form-text"
                placeholder="Add a chore ..."
                onChange={handleChange}
                value={formData.text}
            />
            <AiOutlineEnter />
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