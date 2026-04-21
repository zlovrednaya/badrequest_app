import React from "react";
import {useSortable} from '@dnd-kit/react/sortable';
import './ChoresTrackerAccount.css';
import './ChoresTrackerForm.css';

import ChoresList from './choresApp/ChoresList';
import AddEditMenu from './choresApp/AddEditMenu';
import QuickAddMenu from './choresApp/QuickAddMenu';


import UserMenu from './user/UserMenu';

export default function ChoresTrackerAccount() {
    return (
        <div className="chores-tracker-account">
            <div className="app-form">
                <div className="header-menu">
                    <h1>Chores</h1>
                    <UserMenu />
                </div>
                <div className="chores-tracker-main-window">
                    <AddEditMenu />
                    <QuickAddMenu />
                    <ChoresList />
                </div>
                <div className="footer-menu">
                    <div>Footer</div>
                </div>
            </div>
        </div>
    );
};