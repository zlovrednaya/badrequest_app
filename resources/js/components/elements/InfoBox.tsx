import React, { useState } from "react";

import parse from 'html-react-parser';

import { HiOutlineInformationCircle } from "react-icons/hi2";

import "./InfoBox.css";

interface InfoBoxProps {
    infoMessage: string,
};

export default function InfoBox({infoMessage}: InfoBoxProps) {
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
                    <div className="info-box-message">{parse(infoMessage)}</div>
                )} 
        </div>
        
    );
}