import React from "react";
import { CiViewList } from "react-icons/ci";

export default function TodoMenu({items}) {
    return (
        <div className="left-todo-menu">
            <div className="menu-title">
                {items ? "Saved ToDo lists:": (
                    <div>There's no aved ToDo lists</div>
                )}
            </div>
            {items && items.map((treeItem, i) => (
                <div className="left-todo-menu-content-item" key={"batches-menu-" + i}>
                    <CiViewList />
                    {treeItem.batch_name || ('ToDo list from date')}
                </div>
            ))
            } 
        </div>
    );
}