import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth.js";
import { useSortable } from '@dnd-kit/react/sortable';

import ChoresList from './choresApp/ChoresList.tsx';
import AddEditMenu from './choresApp/menu/AddEditMenu.tsx';
import LeftMenu from "./choresApp/menu/LeftMenu.tsx";
import QuickAddMenu from './choresApp/menu/QuickAddMenu.tsx';
import UserMenu from './user/UserMenu.tsx';
import { useWarning } from "../../components/elements/Warning.tsx";
import { useNavigate } from "react-router-dom";

import { SlStar } from "react-icons/sl";
import axios from "axios";

import './ChoresTrackerAccount.css';
import './ChoresTrackerForm.css';
import PopUp from "../../components/elements/PopUp.tsx";
import { formatDateTime } from "../../utils/date.ts";

export default function ChoresTrackerAccount() {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {askWarning} = useWarning();
    const [selectedFilter, setSelectedFilter] = useState<any | null>(null);
    const [chores, setChores] = useState<any[] | null>([]);
    const [currentAmount, setCurrentAmount] = useState<any>(0);
    const [selectedChores, setSelectedChores] = useState<{[key: string]: any}>({});
    const [calendarMode, setCalendarMode] = useState<(string | null)>(null);
    const [refreshView, setRefreshView] = useState<(s: string | null) => Promise<void>>(() => async () =>{});

    const [disabledForm, setDisabledForm] = useState<boolean>(false);
    const [activeForm, setActiveForm] = useState<string | null>(null);

    const [leftMenuTree, setLeftMenuTree] = useState<any[]>([]);
    const [batchesMenu, setBatchesMenuTree] = useState(null);
    const [threeDaysMenu, setThreeDaysMenuTree] = useState(null);
    const [popUp, setPopUp] = useState<any | null>(null);
    const [userSettings, setUserSettings] = useState<any | null>({});

    const changeCalendarMode = (mode: string | null) => {
        console.log('on changeCalendarMode');

        setCalendarMode(mode);
    };

    const openForm = (formName: string | null, id: string | null) => {
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
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            },
        )
        .then((res) => {
            console.log('user settings loaded');
            const settings = JSON.parse(res.data.settings);
            setUserSettings(settings);
            setCalendarMode(settings.mode);
        });
    }

    async function loadChores(mode: string | null) {
        console.log('loadChores mode is ' + mode);
        let url = window.location.origin + '/chores/getList';

        const params = new URLSearchParams();
        if(selectedFilter && mode === 'simple') {
            params.append("column", selectedFilter?.column);
            params.append("filterWord", selectedFilter?.filterWord);
        }
        if(mode === 'todolist') {
            params.append("istodo", "true");
            params.append("done", "false");
        }

        url += `?${params.toString()}`;
        await axios(url , {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(res => {
            setChores(res.data);
        });
    };

    const refreshGlobalData = async () => {
        await setLeftMenu();
        await updateAmount();
    };

    async function onSelectFilter(filterData: any | null) {
        console.log('onSelectFilter');
        setSelectedFilter(filterData);
        loadChores(appSettings.calendarMode);
    }

    async function onChoreSaved(mode: string | null) {
        await refreshView(mode);
        await setLeftMenu();
        await updateAmount();
    };

    const saveChore = async (formData: any) => {
        if(formData.due_datetime) {
            formData.due_datetime = formatDateTime(formData.due_datetime, 'dbstorage');
        }
        await axios('/chores/add', {
            method: 'POST', 
            data: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        .then(async (res) => {
            actions.form.closeForm();
            await actions.chore.onChoreSaved(appSettings.calendarMode);
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
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(res => {
            setCurrentAmount(res.data.amount);
        })
    }

    const choreIds = Object.keys(selectedChores).filter(key=>selectedChores[key]);
    const deleteChores = async (ids: string[] | null, needWarning = true) => {
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
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
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
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(res => {
            setLeftMenuTree(res.data);
        });
    };

    const setBatchesMenu = async () => {
        await axios('/chores/getBatches', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(res => {
            setBatchesMenuTree(res.data);
        });
    }

    const setThreeDaysCalendar = async (dayQuantity = 3) => {
        await axios('/chores/getChoresByDays/days/' + dayQuantity, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
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
        },
    };

    useEffect(() => {
        if (!user) return;
    
        loadSettings();
        updateAmount();

    }, [user?.id]);

    return (
        <div className="chores-tracker-account">
            <div className="app-form">
                <div className="header-menu">
                    <div className="app-name">
                        <h1 className="app-name-logo" onClick={()=>navigate('/')}>Chores</h1>
                    </div>
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
                            actions={actions}
                            appSettings={appSettings}
                        />
                        <ChoresList
                            appSettings={appSettings} 
                            selectedChores={selectedChores} 
                            chores={chores}
                            actions={actions}
                        />
                        <div className="chores-tracker-footer">
                            {calendarMode == 'todolist' && (
                                <div className="amount-component">
                                    <span>ToDo list amount:</span> <SlStar /> 
                                    <div>{appSettings?.currentAmount?.todo_done_amount}</div>
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