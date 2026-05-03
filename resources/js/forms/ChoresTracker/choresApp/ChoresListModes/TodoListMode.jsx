import React from "react";

import "../ChoresList.css";

export default function TodoListMode({chores}) {
    return (
        <div className="chores-list-todo">todo
            {
                chores && chores.map((item, key)=>(
                    <div>

                    </div>
                ))
            }
        </div>
    );
}