import axios from "axios";
import React from "react";
import { CiViewList } from "react-icons/ci";
type TodoMenuProps = {
    items: any[],
};
export default function TodoMenu({items}: TodoMenuProps) {
    const openToDoList = async (id: number) => {
        await axios(`/chores/openBatch/id/${id}`, {
            method: 'GT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(()=>{
            
        })
        .catch();
    };

    return (
        <div className="left-todo-menu">
            <div className="menu-title">
                {items ? "Saved ToDo lists:": (
                    <div>There's no available ToDo lists</div>
                )}
            </div>
            {items && items.map((treeItem, i) => (
                <div className="left-todo-menu-content-item" key={"batches-menu-" + i} onClick={()=>openToDoList(treeItem.id)}>
                    <CiViewList />
                    {treeItem.batch_name || ('ToDo list from date')}
                </div>
            ))
            } 
        </div>
    );
}