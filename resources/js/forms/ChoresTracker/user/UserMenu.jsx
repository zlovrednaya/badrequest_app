import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/useAuth";

import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

import "./userMenu.css";

export default function UserMenu() {
    const {user, logout} = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
    function handleLogout() {
        logout();
        navigate("/");
    }
    function toggleMenu() {
        setOpen(!open);
    }
    return (
        <div className="user-menu">
            <div className="user-profile">
                <div className="user-profile-child" onClick={toggleMenu}>
                    <div className="user-avatar"></div>
                    <div className="user-name">{user.name}</div>
                    
                </div>
            </div>
            {open && (<div className="dropdown-menu">
                <div className="dropdown-menu-item" onClick={() => navigate("/account-edit")}>
                    <CgProfile />
                    <div className="dropdown-menu-item-text">Profile</div>
                </div>
                <div className="dropdown-menu-item" onClick={handleLogout}>
                    <CiLogout />
                    <div className="dropdown-menu-item-text">Logout</div>
                </div>

            </div>)}
            
        </div>
    );
}