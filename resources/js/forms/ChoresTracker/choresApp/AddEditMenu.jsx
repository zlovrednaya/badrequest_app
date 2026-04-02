import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdShare } from "react-icons/md";


import './choresApp.css';

export default function AddEditMenu() {
    return (
        <div className="add-edit-menu">
            <div className="add-edit-menu-icon"><MdAddCircleOutline /></div>
            <div className="add-edit-menu-icon"><MdEdit /></div>
            <div className="add-edit-menu-icon"><MdDeleteOutline /></div>
            <div className="add-edit-menu-icon"><MdShare /></div>
        </div>
    );
}