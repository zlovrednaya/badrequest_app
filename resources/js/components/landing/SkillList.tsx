import React, { useState } from 'react';

import { FaReact } from "react-icons/fa";
import { FaPhp } from "react-icons/fa";
import { FaLaravel } from "react-icons/fa";
import { SiPostgresql } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { DiRedis } from "react-icons/di";
import { SiMongodb } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { FaCss } from "react-icons/fa6";
import { FaDocker } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { FiArrowRightCircle } from "react-icons/fi";




import { BsFiletypeJson } from "react-icons/bs";
import { BsFiletypeXml } from "react-icons/bs";
import { BsFiletypeCss } from "react-icons/bs";
import { SiTypescript } from "react-icons/si";


export default function SkillList() {
    const baseLogoUrl = window.location.origin + "/storage/technologies/";
    
    return (
        <div className="skill-list">
            <div className="skill-title highlight-text">Skills and expertise</div>
            <div className="skill-component">
                <div className="skill-area">
                    <span><FiArrowRightCircle />Frontend</span>
                    <span><FiArrowRightCircle />Backend</span>
                    <span><FiArrowRightCircle />Databases</span>
                </div>
                <div className="skill-icons">
                    <IoLogoJavascript />
                    <SiTypescript />
                    <FaReact />
                    <FaPhp />
                    <FaLaravel />
                    <SiPostgresql />
                    <FaAws />
                    <DiRedis />
                    <SiMongodb />
                    <FaHtml5 />
                    <FaDocker />
                    <BsFiletypeCss />
                    <BsFiletypeJson />
                    <BsFiletypeXml />
                </div>

            </div>
        </div>
    );
}
