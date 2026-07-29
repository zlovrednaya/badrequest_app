import React, { useState, useEffect }  from "react";

import { LuClock } from "react-icons/lu";
import { SlStar } from "react-icons/sl";
import axios from "axios";

import SimpleMode from "./ChoresListModes/SimpleMode.tsx";
import TodoListMode from "./ChoresListModes/TodoListMode.tsx";
import CalendarMode from "./ChoresListModes/CalendarMode.tsx";

import './ChoresList.css';
import { formatDateTime } from "../../../utils/date.ts";

type ChoresListProps = {
    chores: any[] | null,
    selectedChores: Record<string, boolean>,
    actions: any,
    appSettings: any
};
export default function ChoresList({chores, selectedChores, actions, appSettings}: ChoresListProps) {

    const [calendarItems, setCalendarItems] = useState([]);
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const [currentDate, setCurrentDate] = useState<Date | string>(firstDay);

     // chores for calendar
    const getCalendarChores = async (currentDate: Date | string) => {
        axios('/chores/getAllForCalendar' , {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
                date: formatDateTime(currentDate, 'datewithdash'),
            },
        })
        .then(res => {
            setCalendarItems(res.data);
        })
        .catch(() => {
            debugger;
        })
    };

    function selectItem(itemKey: string) {
        actions.chore.setSelectedChores((prev: Record<string, boolean>) => ({
            ...prev,
            [itemKey]: !prev[itemKey]
        }));
    }

    const editChore = () => {
        console.log('edit');
    }

    const listActions = {
        ...actions,
        selection: {
            selectItem,
        },
        chore: {
            ...actions.chore,
            editChore,
        }
    }

    useEffect(() => {
        console.log('load chores list. calendarmode is ' + appSettings.calendarMode);
        
        if(!appSettings.calendarMode) return;

        // assign refresh functions
       switch(appSettings.calendarMode) {
            case 'simple':
            case 'todolist':
                const refresh = async () => {
                    await actions.chore.loadChores(appSettings.calendarMode);
                };

                actions.view.setRefreshView(() => refresh);
                refresh(); // Load immediately
            
                break;
            case 'calendar':
                const refreshCalendar = async () => {
                    await getCalendarChores(currentDate);
                    await actions.menu.setThreeDaysCalendar();
                };

                actions.view.setRefreshView(() => refreshCalendar);
                refreshCalendar(); // Load immediately
            break;  
        }

        /// actions.amount.updateAmount(); - moved into refreshview
        
    }, [appSettings.selectedFilter, appSettings.calendarMode]);

    return (
        <div className="chores-list">
            {appSettings.calendarMode === 'simple' &&
                <SimpleMode 
                    chores={chores} 
                    selectedChores={selectedChores}
                    actions={listActions}
                    appSettings={appSettings} 
                />
            }
            {appSettings.calendarMode === 'todolist' &&
                <TodoListMode 
                    chores={chores}
                    selectedChores={selectedChores}
                    actions={listActions}
                    appSettings={appSettings} 
                />
            }
            {appSettings.calendarMode === 'calendar' &&
                <CalendarMode 
                    items={calendarItems}
                    currentDate={currentDate}
                    getCalendarChores={getCalendarChores}
                    refreshCalendar={actions.view.refreshView}
                    setCurrentDate={setCurrentDate}
                    appSettings={appSettings} 
                    onSave={listActions.chore.saveChore}
             />
            }
        </div>
    );
}