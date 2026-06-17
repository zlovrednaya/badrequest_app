import React, { useState } from "react";
import { MdOutlineSave } from "react-icons/md";
import { CiViewList } from "react-icons/ci";

import './SaveBatch.css';

export default function SaveBatch() {
    const [batchName, setBatchName] = useState('');
    const saveBatch = async () => {
        await axios('/chores/saveBatch', {
            method: 'POST', 
            data: JSON.stringify({batch_name: batchName || 'List from '}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
        })
        .then(res => {
            actions.menu.setBatchesMenu();
        });
    };

    return (
        <div className="save-batch-form">
            <div className="add-edit-batch" title="Save ToDo batch">
                <CiViewList />                            
                <input 
                    type="text"
                    placeholder="Enter batch name ..."
                    onChange={(e)=>setBatchName(e.target.value)}
                />
                <div className="save-batch-button button-left-icon" onClick={() => saveBatch()}>
                    <MdOutlineSave />
                    <span>Save batch</span>
                </div>
            </div>
        </div>
    );
}