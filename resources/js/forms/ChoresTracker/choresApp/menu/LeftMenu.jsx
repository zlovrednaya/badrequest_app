import React from "react";

import './LeftMenu.css';

export default function LeftMenu() {
    const leftMenuTree = [
        {
            name: 'Color',
            items: [
                {
                    name: 'Blue',
                    code: '#435354',
                    amount: '12',
                },
                {
                    name: 'Red',
                    code: '#4353454',
                    amount: '0',
                }
            ],
        },
        {
            name: 'Category',
            items: [
                {
                    name: 'Home',
                    code: '#435354',
                },
                {
                    name: 'Schedule',
                    code: '#4353454',
                },
                {
                    name: 'Notes',
                    code: '#4353454',
                }
            ],
        },
        {
            name: 'Drawings',
            items:[],
        }
    ];

    return (
        <div className="left-menu">
            Left menu
            <div className="left-menu-content">
                {leftMenuTree.map((treeItem, i) => (
                    <div className="left-menu-content-item" key={i}>
                        <div className="left-menu-content-item-parent">{treeItem.name}</div>
                        {treeItem.items.map((treeItemChild, k) => (
                            <div className="left-menu-content-item-child">
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