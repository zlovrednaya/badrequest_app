import React from "react";
import { FaCircle } from "react-icons/fa";

export default function FilterMenu({items}){
    return (
        <div className="left-filter-menu">
            { items.map((treeItem, i) => (
                <div className="left-menu-content-item" key={i}>
                    <div className="left-menu-content-item-parent" onClick={()=>{filterChores(treeItem.filterName, treeItem.filterType === 'bool' ? 1 : 'all')}}>
                        {treeItem.name}
                        {treeItem.amount && (
                            <div className="left-menu-content-item-parent-amount">
                                {treeItem.amount}
                            </div>
                        )}
                    </div>
                    {treeItem.items?.map((treeItemChild, k) => (
                        <div className="left-menu-content-item-child" key={k} onClick={()=>{filterChores(treeItem.filterName, treeItemChild.filterName)}}>
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
    );
}