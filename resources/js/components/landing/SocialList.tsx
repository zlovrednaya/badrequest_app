import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";


export default function SocialList() {
    return (
        <div className="social-list">
            <FaGithub />
            <CiLinkedin />
            <FaInstagram />
        </div>
    );
}