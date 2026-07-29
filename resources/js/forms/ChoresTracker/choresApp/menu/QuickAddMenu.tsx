import React, { useState } from "react";

import { SlStar } from "react-icons/sl";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineEnter } from "react-icons/ai";


import './QuickAddMenu.css';

const BASE_FORM_STATE = {
    title: "",
    text: "",
    due_datetime: "",
};

type QuickAddMenuProps = {
    formData: any,
    onChange: (value: any) => void,
    onSave: (formData: any) => void,
};
export default function QuickAddMenu({formData, onChange, onSave}: QuickAddMenuProps) {
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
    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        onSave(formData);
    };

    return (
        <form className="quick-add-menu" 
            onSubmit={(e) => {
            e.preventDefault();
            handleSave(e);
        }}>
            <IoIosAddCircleOutline />
            <input
                type="text"
                name="title"
                className="quick-item-form-title"
                placeholder="Add a chore ..."
                onChange={(e) =>
                    onChange((prev: any) => ({
                        ...prev,
                        title: e.target.value,
                    }))
                }
                value={formData.title}
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