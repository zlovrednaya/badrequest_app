import React from "react";

import { IoIosCloseCircle } from "react-icons/io";

export default function ChoresSettingsForm({onClose}){

    const closeForm = () => {
        onClose();
    };

    return (
        <div>
            <div className="chores-item-header">
                <span className="chores-item-header-title">Filters </span>
                <div className="close-form" onClick={closeForm}>
                    <IoIosCloseCircle />
                </div>
            </div>
        </div>
    );
}