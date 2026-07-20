import React, { useState } from "react";

import { SlStar } from "react-icons/sl";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineEnter } from "react-icons/ai";


import './QuickAddMenu.css';

const BASE_FORM_STATE = {
    text: "",
    due_datetime: "",
};

export default function QuickAddMenu({formData, onChange, onSave}) {
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
    function handleSave(e) {
        onSave(formData);
    };

    return (
        <form className="quick-add-menu" 
            onSubmit={(e) => {
            e.preventDefault();
            handleSave();
        }}>
            <IoIosAddCircleOutline />
            <input
                type="text"
                name="text"
                className="quick-item-form-text"
                placeholder="Add a chore ..."
                onChange={(e) =>
                    onChange(prev => ({
                        ...prev,
                        text: e.target.value,
                    }))
                }
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
        </form>
    );
}