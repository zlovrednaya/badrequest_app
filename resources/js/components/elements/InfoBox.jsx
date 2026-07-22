import React, { useState } from "react";

import Parser from 'html-react-parser';

import { HiOutlineInformationCircle } from "react-icons/hi2";

import "./InfoBox.css";
export default function InfoBox({infoMessage}) {
    const [active, setActive] = useState(false);
    
    function onFocus() {
        debugger;
        setActive(true)
    }

    return(
        <div className="info-box-component" 
            onMouseOver={() => setActive(true)}
            onMouseOut={() =>setActive(false)}
        >
                <HiOutlineInformationCircle />
                
                {active && (
                    <div className="info-box-message">{Parser(infoMessage)}</div>
                )} 
        </div>
        
    );
}