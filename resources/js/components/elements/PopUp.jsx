import React, { useEffect } from "react";
import "./PopUp.css";
import { HiOutlineBadgeCheck } from "react-icons/hi";

import { PiWarningLight } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { RiProhibited2Line } from "react-icons/ri";


export default function PopUp({isOpen, success, message, closeForm}) {
    if(!isOpen) {
        return null;
    }
    let icon;
    if (success) {
        icon = (<HiOutlineBadgeCheck />);
    } else {
        icon = (<RiProhibited2Line />);
    }

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const timer = setTimeout(() => {
            closeForm()
        }, 3000)

        return () => clearTimeout(timer);
    }, [isOpen, closeForm]);
    return (
        <div className={`popup ${success?"success":"fail"}` }>
            <div className="popup-body">
                <span className="popup-icon">
                    {icon}
                </span>
                <span className="popup-text">{message}</span>
                <div className="popup-close" onClick={closeForm}>
                    <IoMdClose />
                </div>
            </div>
        </div>
    );
}