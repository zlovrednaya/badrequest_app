import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaCircle } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FaPenFancy } from "react-icons/fa6";
import { MdStickyNote2 } from "react-icons/md";

import Calendar from "../../../../components/elements/Calendar.tsx";
import TodoMenu from "./leftMenu/TodoMenu.tsx";
import FilterMenu from "./leftMenu/FilterMenu.tsx";
import ThreeDaysPlanner from "../../../../components/elements/ThreeDaysPlanner.tsx";

import './LeftMenu.css';
type LeftMenuProps = {
    onSelectFilter: (filterData: {column: string, filterWord: string}) => void,
    actions: any,
    appSettings: any,
};
export default function LeftMenu({onSelectFilter, actions, appSettings}: LeftMenuProps) {
    
    const [selected, setSelected] = useState();

    const filterChores = (column: string, filterWord: string) => {
        const filterData = {
            column: column,
            filterWord: filterWord,
        };
        onSelectFilter(filterData);
    };

    useEffect(() => {
        console.log('selectedFilter changed', appSettings.selectedFilter);

        if (!appSettings.selectedFilter) {
            switch (appSettings.calendarMode){
                case 'simple':
                    actions.menu.setLeftMenu();
                    break;
                case 'todolist':
                    if(!actions.menu.batchesMenu) {
                        console.log('launch batchesmenu');
                        actions.menu.setBatchesMenu();
                    }
                case 'calendar':
                    actions.menu.setThreeDaysCalendar(3);    
                    break;
            }
           
            return;
        }
        
    }, [appSettings.selectedFilter, appSettings.calendarMode]);

    return (
        <div className="left-menu">
            <div className="left-menu-content">
                {appSettings?.calendarMode === 'simple' && 
                    <FilterMenu 
                        items={appSettings?.menu?.leftMenuTree}
                        selectedFilter = {appSettings?.selectedFilter}
                        filterChores = {filterChores}
                    />
                }
                {appSettings?.calendarMode === 'todolist' && 
                    <TodoMenu items={appSettings?.menu?.batchesMenu} />
                }
                
            </div>
            <div className={`calendar calendar-${appSettings.calendarMode}`}>
                <Calendar />
            </div>

            {appSettings?.calendarMode === 'calendar' &&  
                (<ThreeDaysPlanner days = {appSettings?.menu?.threeDaysMenu}/>)
            }
            <div className="add-element add-chore" onClick={() => actions.form.openForm("ChoresItem")}>
                <div className="add-button ">
                    <MdStickyNote2 />
                    <span>New chore</span>
                </div>
            </div>
            <div className="add-element add-drawing" onClick={() => actions.form.openForm("DrawItem")}>
                <div className="add-button">
                    <FaPenFancy />
                    <span>New drawing</span>
                </div>
            </div>
        </div>
    );
}