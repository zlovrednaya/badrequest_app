import React from "react";
import { LuClock } from "react-icons/lu";
import { SlStar } from "react-icons/sl";
import "../ChoresList.css";

export default function SimpleMode({chores, selectedChores, formatDate}) {

    return (
        <div className="chores-list-simple">
            {
                chores.map((choreItem, i) => (
                    <div className="chore-item-main" key={choreItem.id} onClick={()=>selectItem(choreItem.id)} onDoubleClick={() => editItem()}>
                        <div className={`chore-item ${selectedChores[choreItem.id] === true && "selected"}`} style={{backgroundColor:choreItem.color}}>
                            <div className="chore-item-title">{choreItem.title}</div>
                            <div className="chore-item-text">
                                
                                {choreItem.text}
                            </div>
                            {choreItem.due_datetime && (
                                <div className="chore-item-date">
                                    <LuClock />
                                    <span>{formatDate(choreItem.due_datetime)}</span>
                                </div>
                            )} 
                            
                        </div>
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