import React from "react";
import './ChoresTrackerAccount.css';
import './ChoresTrackerForm.css';
/*
import ChoresList from './choresApp/ChoresList';
import ChoresItem from './choresApp/ChoresItem';
import AddEditButtons from './choresApp/AddEditButtons';

*/
import UserMenu from './user/UserMenu';

export default function ChoresTrackerAccount() {
    return (
        <div className="ChoresTrackerAccount">
            <div className="app-form">
                <div className="header-menu">
                    <h1>Chores</h1>
                    <UserMenu />
                </div>
                <div className="ChoresTrackerMainWindow">

                </div>
                <div className="footer-menu">
                    <div>Footer</div>
                </div>
            </div>
        </div>
    );
};