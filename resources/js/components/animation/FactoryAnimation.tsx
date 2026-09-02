import React from "react";

import { CiSettings } from "react-icons/ci";
import "./FactoryAnimation.css";

export default function FactoryAnimation() {
    return (
        <div className="factory-animation">
            <div className="settings-wheel"><CiSettings /></div>
            <div className="glow-element" />
            <div className="smoke" />
            <div className="trapezoid"></div>
            <div className="house">
                
            </div>


            
        </div>
    );
}