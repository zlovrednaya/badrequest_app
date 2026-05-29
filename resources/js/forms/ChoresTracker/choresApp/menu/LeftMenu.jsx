import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaCircle } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FaPenFancy } from "react-icons/fa6";
import { MdStickyNote2 } from "react-icons/md";

import Calendar from "../../../../components/elements/Calendar";

import './LeftMenu.css';

export default function LeftMenu({onSelectFilter, actions, appSettings}) {
    const [leftMenuTree, setLeftMenuTree] = useState([]);
    const [selected, setSelected] = useState();
    const getMenuStructure = async () => {
        axios( window.location.origin + '/chores/getChoresStructure', {
            method: 'POST', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        })
        .then(res => {
            setLeftMenuTree(res.data);
        });
    };

    const filterChores = (column, filterWord) => {
        const filterData = {
            column: column,
            filterWord: filterWord,
        };
        onSelectFilter(filterData);
    };

    useEffect(() => {
        getMenuStructure();
    }, []);

    return (
        <div className="left-menu">
            <div className="left-menu-content">
                {leftMenuTree?.map((treeItem, i) => (
                    <div className="left-menu-content-item" key={i}>
                        <div className="left-menu-content-item-parent" onClick={()=>{filterChores(treeItem.name,'all')}}>
                            {treeItem.name}
                            {treeItem.amount && (
                                <div className="left-menu-content-item-parent-amount">
                                    {treeItem.amount}
                                </div>
                            )}
                        </div>
                        {treeItem.items?.map((treeItemChild, k) => (
                            <div className="left-menu-content-item-child" key={k} onClick={()=>{filterChores(treeItem.name, treeItemChild.filterName)}}>
                                {treeItemChild.color && (
                                    <div className="left-menu-item-color-circle" style={{color:treeItemChild.color}}>
                                        <FaCircle />
                                    </div>
                                )}
                                <div className="left-menu-item-color-name">
                                    {treeItemChild.name}
                                </div>
                                {treeItemChild.amount && (
                                    <div className="left-menu-content-item-child-amount">
                                        {treeItemChild.amount}
                                    </div>
                                )}
                                
                            </div>
                        ))}    
                    </div>
                ))}
                
            </div>
            <div className="calendar">
                <Calendar />
            </div>
            <div className="add-element add-chore" onClick={() => actions.form.openForm("ChoresItem")}>
                <div className="add-button ">
                    <MdStickyNote2 />
                    <span>New chore</span>
                </div>
            </div>
            <div className="add-element add-drawing" onClick={() => actions.form.openForm("DrawItem")}>
                <div className="add-button">
                    <FaPenFancy />
                    <span>New drawing</span>
                </div>
            </div>
        </div>
    );
}