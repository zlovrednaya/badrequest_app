import React, { useEffect } from "react";
import { LuClock } from "react-icons/lu";
import { SlStar } from "react-icons/sl";
import "../ChoresList.css";

export default function SimpleMode({chores, selectedChores, actions, appSettings}) {

    return (
        <div className="chores-list-simple">
            {
                chores.map((choreItem, i) => (
                    <div className="chore-item-main" key={choreItem.id} onClick={()=>actions.selection.selectItem(choreItem.id)} onDoubleClick={() => editChore()}>
                        
                        <div className={`chore-item ${selectedChores[choreItem.id] === true && "selected"}`} style={{backgroundColor:choreItem.done?'#e4fde8':'', border:choreItem.done?'0.5px solid #2cc428':''}}>
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
                    </div>
                ))
            }
        </div>
    );
}