import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaCircle } from "react-icons/fa";

import './LeftMenu.css';

export default function LeftMenu() {
    const [leftMenuTree, setLeftMenuTree] = useState([]);
    const getMenuStructure = async () => {
        axios( window.location.origin+'/chores/getChoresStructure', {
            method: 'POST', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        })
        .then(res => {
            setLeftMenuTree(res.data);
        })
    };
    useEffect(() => {
        getMenuStructure();
    }, []);

    return (
        <div className="left-menu">
            Left menu
            <div className="left-menu-content">
                {leftMenuTree?.map((treeItem, i) => (
                    <div className="left-menu-content-item" key={i}>
                        <div className="left-menu-content-item-parent">
                            {treeItem.name}
                            {treeItem.amount && (
                                <div className="left-menu-content-item-parent-amount">
                                    {treeItem.amount}
                                </div>
                            )}
                        </div>
                        {treeItem.items?.map((treeItemChild, k) => (
                            <div className="left-menu-content-item-child">
                                {treeItemChild.color && (
                                    <div className="left-menu-item-color-circle" style={{color:treeItemChild.color}}>
                                        <FaCircle />
                                    </div>
                                )}
                                <div>
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
            <div className="calendar"></div>
        </div>
    );
}