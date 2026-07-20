import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useSortable } from '@dnd-kit/react/sortable';

import ChoresList from './choresApp/ChoresList';
import AddEditMenu from './choresApp/menu/AddEditMenu';
import LeftMenu from "./choresApp/menu/LeftMenu";
import QuickAddMenu from './choresApp/menu/QuickAddMenu';
import UserMenu from './user/UserMenu';
import { useWarning } from "../../components/elements/Warning";
import { useNavigate } from "react-router-dom";

import { SlStar } from "react-icons/sl";

import './ChoresTrackerAccount.css';
import './ChoresTrackerForm.css';
import PopUp from "../../components/elements/PopUp";

export default function ChoresTrackerAccount() {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {askWarning} = useWarning();
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [chores, setChores] = useState([]);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [selectedChores, setSelectedChores] = useState({});
    const [calendarMode, setCalendarMode] = useState(null);
    const [refreshView, setRefreshView] = useState(() => async () =>{});

    const [disabledForm, setDisabledForm] = useState('');
    const [activeForm, setActiveForm] = useState(null);

    const [leftMenuTree, setLeftMenuTree] = useState([]);
    const [batchesMenu, setBatchesMenuTree] = useState(null);
    const [threeDaysMenu, setThreeDaysMenuTree] = useState(null);
    const [popUp, setPopUp] = useState(null);
    const [userSettings, setUserSettings] = useState({});

    const changeCalendarMode = (mode) => {
        console.log('on changeCalendarMode');

        setCalendarMode(mode);
    };

    const openForm = (formName, id) => {
        setActiveForm(formName);
        setDisabledForm(true);
    };

    const closeForm = () => {
        setDisabledForm(false);
        setActiveForm(null);
    };

    async function loadSettings() {
        console.log('load settings');
        await axios('/chores/getUserSettings', {
                method: 'GET', 
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }),
            },
        )
        .then((res) => {
            console.log('user settings loaded');
            const settings = JSON.parse(res.data.settings);
            setUserSettings(settings);
            setCalendarMode(settings.mode);
        });
    }

    async function loadChores(mode) {
        console.log('loadChores mode is ' + mode);
        let url = window.location.origin + '/chores/getList';

        const params = new URLSearchParams();
        if(selectedFilter) {
            params.append("column", selectedFilter.column);
            params.append("filterWord", selectedFilter.filterWord);
        }
        if(mode === 'todolist') {
            params.append("istodo", "true");
            params.append("done", "false");
        }

        url += `?${params.toString()}`;
        await axios(url , {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        })
        .then(res => {
            setChores(res.data);
        });
    };

    const refreshGlobalData = async () => {
        await setLeftMenu();
        await updateAmount();
    };

    async function onSelectFilter(filterData) {
        console.log('onSelectFilter');
        setSelectedFilter(filterData);
        loadChores(appSettings.calendarMode);
    }

    async function onChoreSaved(mode) {
        await refreshView(mode);
        await setLeftMenu();
        await updateAmount();
    };

    const saveChore = async (formData) => {
        await axios('/chores/add', {
            method: 'POST', 
            data: JSON.stringify(formData),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
        })
        .then(res => {
            actions.form.closeForm();
            actions.chore.onChoreSaved(appSettings.calendarMode);
        })
        .catch(err => {
            console.log(err);
            let errors = err.response.data.errors;
            let errorText = err.response.data.message;
        })
    };

    function updateAmount() {
        axios('/chores/getAmount' , {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        })
        .then(res => {
            setCurrentAmount(res.data.amount);
        })
    }

    const choreIds = Object.keys(selectedChores).filter(key=>selectedChores[key]);
    const deleteChores = async (ids, needWarning = true) => {
        const toDeleteIds = ids || choreIds;

        if (needWarning) {
            const warningResult = await askWarning({
                title: 'You want to delete selected chores (' + toDeleteIds.length + (toDeleteIds.length > 1? " pcs" : " pc" ) + ')' ,
                message: 'Are you sure?',
                confirmText: 'Yes, delete',
                cancelText: 'No, keep chores'
            });

            if (!warningResult) return;
        }
        
        await axios('/chores/deleteChores', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
            data: JSON.stringify({ids:toDeleteIds}),
        })
        .then((res) => {
            actions.chore.onChoreSaved(calendarMode);
            actions.amount.updateAmount();
            // update selected chores
            setSelectedChores([]);
        })
         .catch(err => {
            console.log(err);
            let errors = err.response.data.errors;
            let errorText = err.response.data.message;
        });
    };

    const setLeftMenu = async () => {
        await axios('/chores/getChoresStructure', {
            method: 'POST', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        })
        .then(res => {
            setLeftMenuTree(res.data);
        });
    };

    const setBatchesMenu = async () => {
        await axios('/chores/getBatches', {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        })
        .then(res => {
            setBatchesMenuTree(res.data);
        });
    }

    const setThreeDaysCalendar = async (dayQuantity) => {
        await axios('/chores/getChoresByDays/days/' + dayQuantity, {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        })
        .then(res => {
            setThreeDaysMenuTree(res.data);
        });
    };

    const appSettings = {
        userSettings,
        chores,
        calendarMode,
        selectedFilter,
        currentAmount,
        formState: {
            disabledForm,
            activeForm,
        },
        menu: {
            leftMenuTree,
            batchesMenu,
            threeDaysMenu,
        },
    };

    const actions = {
        mode: {
            changeCalendarMode,
        },
        view: {
            refreshView,
            setRefreshView,
        },
        chore: {
            loadChores,
            onChoreSaved,
            deleteChores,
            setSelectedChores,
            saveChore,
        },
        amount: {
            updateAmount,
        },
        form: {
            openForm,
            closeForm,
        },
        menu: {
            setLeftMenu,
            setBatchesMenu,
            setThreeDaysCalendar,
        },
        popup: {
            setPopUp,
        },
        settings: {
            loadSettings,
        }
    };

    useEffect(() => {
        if (!user) return;
    
        loadSettings();

    }, [user?.id]);

    return (
        <div className="chores-tracker-account">
            <div className="app-form">
                <div className="header-menu">
                    <h1 className="app-name" onClick={()=>navigate('/')}>Chores</h1>
                    <UserMenu 
                        appSettings={appSettings}
                    />
                </div>
                <div className="chores-tracker-window">
                    <div className="chores-tracker-left-window">
                        <LeftMenu 
                            onSelectFilter={onSelectFilter}
                            actions={actions}
                            appSettings={appSettings}
                        />
                    </div>
                    <div className="chores-tracker-main-window">
                        <AddEditMenu 
                            chores={chores}  
                            selectedChores={selectedChores}
                            calendarMode={calendarMode} 
                            actions={actions}
                            appSettings={appSettings}
                        />
                        <ChoresList
                            appSettings={appSettings} 
                            filter={selectedFilter} 
                            selectedChores={selectedChores} 
                            setSelectedChores={setSelectedChores} 
                            chores={chores}
                            calendarMode={calendarMode}
                            actions={actions}
                        />
                        <div className="chores-tracker-footer">
                            {calendarMode == 'todolist' && (
                                <div className="amount-component">
                                    <span>ToDo list amount:</span> <SlStar /> 
                                    <div>{appSettings.currentAmount.todo_done_amount}</div>
                                </div> 
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <PopUp
                isOpen={popUp}
                success={popUp?.success}
                message={popUp?.message}
                closeForm={() => setPopUp(null)}
            />
                
        </div>
    );
};