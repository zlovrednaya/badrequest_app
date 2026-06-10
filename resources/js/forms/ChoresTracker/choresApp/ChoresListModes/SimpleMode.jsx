import React, { useEffect } from "react";
import { LuClock } from "react-icons/lu";
import { SlStar } from "react-icons/sl";
import { IoCheckmarkCircleOutline } from "react-icons/io5";


import "../ChoresList.css";

export default function SimpleMode({chores, selectedChores, actions, appSettings}) {

    return (
        <div className="chores-list-simple">
            {
                chores.map((choreItem, i) => (
                    <div className="chore-item-main" key={choreItem.id} onClick={()=>actions.selection.selectItem(choreItem.id)} onDoubleClick={() => editChore()}>
                        
                        <div className={`chore-item ${selectedChores[choreItem.id] === true && "selected"}`}>
                            <div className="chore-item-color" style={{backgroundColor:choreItem.color}}></div>
                            <div className="chore-item-body">
                                <div className="chore-item-title">{choreItem.title}</div>
                                <div className="chore-item-text">
                                    {choreItem.text}
                                </div>
                                
                            </div>
                        </div>
                        {choreItem.due_datetime && (
                            <div className="chore-item-date">
                                <LuClock />
                                <span>{actions.format.formatDate(choreItem.due_datetime,'shortmonth')}</span>
                            </div>
                        )} 
                        {choreItem.cost && (
                            <div className="chore-item-cost">
                                <SlStar /> 
                                <div >{choreItem.cost}</div>
                            </div>
                        )}
                        {choreItem.drawing && (
                            <div className="chore-item-drawing">
                                    <img src={choreItem.drawing} alt="preview" />
                                <div ></div>
                            </div>
                        )}
                        <div className="chore-item-bottom-labels">
                            {choreItem.done && (
                                <div className="chore-item-done">
                                    <IoCheckmarkCircleOutline />
                                    <div>done</div>
                                </div>
                            )}
                            {choreItem.category && (
                                <div className="chore-item-category">
                                    <div >{choreItem.category}</div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                ))
            }
        </div>
    );
}