import React, { useState } from "react";
import { useSortable } from '@dnd-kit/react/sortable';

import ChoresList from './choresApp/ChoresList';
import AddEditMenu from './choresApp/menu/AddEditMenu';
import LeftMenu from "./choresApp/menu/LeftMenu";
import QuickAddMenu from './choresApp/menu/QuickAddMenu';
import UserMenu from './user/UserMenu';

import './ChoresTrackerAccount.css';
import './ChoresTrackerForm.css';

export default function ChoresTrackerAccount() {
    const [selectedFilter, setSelectedFilter] = useState(null);

    return (
        <div className="chores-tracker-account">
            <div className="app-form">
                <div className="header-menu">
                    <h1>Chores</h1>
                    <UserMenu />
                </div>
                <div className="chores-tracker-window">
                    <div className="chores-tracker-left-window">
                        <LeftMenu onSelectFilter = {setSelectedFilter}/>
                    </div>
                    <div className="chores-tracker-main-window">
                        <AddEditMenu />
                        <QuickAddMenu />
                        <ChoresList filter = {selectedFilter} />
                    </div>
                </div>
                <div className="footer-menu">
                    <div></div>
                </div>
            </div>
        </div>
    );
};