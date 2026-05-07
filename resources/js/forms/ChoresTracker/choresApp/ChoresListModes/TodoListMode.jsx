import React from "react";

import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { LuClock } from "react-icons/lu";
import { SlStar } from "react-icons/sl";

import ToDoItem from "../item/ToDoItem";

import "../ChoresList.css";
import "./TodoListMode.css";

export default function TodoListMode({chores, selectedChores, setSelectedChores, formatDate, selectItem, onNoteSaved}) {

    const selectAll = () => {
        console.log('select');
    };

    const selectTodoElement = async (choreItem, isDone) => {
        await axios( '/chores/update/'+ choreItem.id, {
            method: 'PATCH', 
            data: JSON.stringify({
                done: isDone
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
        })
        .then(res => {
            setSelectedChores([]);
            onNoteSaved('todolist');
        })
        .catch(err => {
            console.log(err);
            let errors = err.response.data.errors;
            let errorText = err.response.data.message;
        })
    };

    const hasSelected = Object.values(selectedChores).filter(Boolean).length;

    return (
        <div className="chores-list-todo">
            <div className="chores-list-todo-header" >
                <div className="todo-item-title-select-element">
                    {hasSelected > 0 && (
                        <div className="selected" onClick={() => setSelectedChores([])}>
                            <MdOutlineCheckBox />
                        </div>
                    )}
                    {hasSelected === 0 && (
                        <div className="unselected" onClick={() => selectAll(true)}>
                            <MdOutlineCheckBoxOutlineBlank />
                        </div>
                    )}
                </div>
                <div className="todo-item-info"></div>        
            </div>
            <div  className="chores-list-todo-list">
                {
                    chores && chores.map((choreItem, i)=>(
                        <div className="todo-item" key={choreItem.id} style={{backgroundColor:choreItem.color}}>
                            <div className="todo-item-title-select-element" onClick={() => selectItem(choreItem.id)}>
                                {selectedChores && (selectedChores[choreItem.id] === true || choreItem.done === true) && (
                                    <div className="selected" onClick={() => selectTodoElement(choreItem, false)}>
                                        <MdOutlineCheckBox />
                                    </div>
                                )}
                                {(!(selectedChores[choreItem.id] === true || choreItem.done === true)) && (
                                    <div className="unselected" onClick={() => selectTodoElement(choreItem, true)}>
                                        <MdOutlineCheckBoxOutlineBlank />
                                    </div>
                                )}
                            </div>
                            <div className="todo-item-cost">
                                {choreItem.cost && (
                                    <div className="todo-item-cost-value">
                                        <SlStar /> 
                                        <div >{choreItem.cost}</div>
                                    </div>
                                )}
                            </div>
                            <div className="todo-item-info">
                                {choreItem.title && (
                                    <div className="todo-item-title">
                                        {choreItem.title}
                                    </div>
                                )}
                                {choreItem.text && (
                                    <div className="todo-item-text">
                                        {choreItem.text}
                                    </div>
                                )}
                                
                                {choreItem.due_datetime && (
                                    <div className="todo-item-date">
                                        <LuClock />
                                        <span>{formatDate(choreItem.due_datetime)}</span>
                                    </div>
                                )} 
                            </div>
                            
                            <div className="todo-item-buttons">
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}