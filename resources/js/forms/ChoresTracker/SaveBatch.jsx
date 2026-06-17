import React, { useState } from "react";
import { MdOutlineSave } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MdSave } from "react-icons/md";



import './SaveBatch.css';

export default function SaveBatch({actions}) {
    const [batchName, setBatchName] = useState('');
    const [batchIsVisible, setBatchIsVisible] = useState(false);

    function onKeyUp(e) {
        if(e.which != 13) return;
        saveBatch();
    }

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

    const openBatchForm = () => {
        setBatchIsVisible(!batchIsVisible);
    };
    return (
        <div className="save-batch-form edit-menu">
            <div className="add-edit-batch" title="Save ToDo batch">                         
                {batchIsVisible && (
                    <div className="add-batch-form" onKeyUp={onKeyUp}>
                        <div className="save-batch-button button-left-icon" onClick={() => setBatchIsVisible(!batchIsVisible)}>
                            <IoIosArrowBack />
                        </div>
                        <input 
                            type="text"
                            placeholder="Enter batch name ..."
                            onChange={(e)=>setBatchName(e.target.value)}
                            autoFocus
                        />
                        <div className="save-batch-button button-left-icon" onClick={() => saveBatch()}>
                            <MdSave />
                            <span>Save batch</span>
                        </div>
                    </div>
                )}
                
                {!batchIsVisible && (
                    <div className="show-batch button-left-icon" onClick={() => openBatchForm()}>
                        <CiViewList />
                        <span>Save batch </span>
                        <IoIosArrowForward />
                    </div>
                )}
            </div>
        </div>
    );
}