import React from "react";
import { useSortable } from '@dnd-kit/react/sortable';

import ChoresList from './choresApp/ChoresList';
import AddEditMenu from './choresApp/AddEditMenu';
import QuickAddMenu from './choresApp/QuickAddMenu';
import UserMenu from './user/UserMenu';

import './ChoresTrackerAccount.css';
import './ChoresTrackerForm.css';

export default function ChoresTrackerAccount() {

    return (
        <div className="chores-tracker-account">
            <div className="app-form">
                <div className="header-menu">
                    <h1>Chores</h1>
                    <UserMenu />
                </div>
                <div className="chores-tracker-window">
                    <div className="chores-tracker-left-window">
                        left Menu
                    </div>
                    <div className="chores-tracker-main-window">
                        <AddEditMenu />
                        <QuickAddMenu />
                        <ChoresList />
                    </div>
                </div>
                <div className="footer-menu">
                    <div></div>
                </div>
            </div>
        </div>
    );
};