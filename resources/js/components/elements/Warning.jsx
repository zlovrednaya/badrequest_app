import React, { createContext, useContext, useState } from "react";

import { CiWarning } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";

import "./Warning.css"

export const WarningContext = createContext(null);

export const useWarning = () => {
    const context = useContext(WarningContext);
    if (!context) throw new Error("useWarning must be used inside WarningProvider");

    return context;
};

export const WarningProvider = ({children}) => {
    const [state, setState] = useState(null);

    const askWarning = (options) => {
        return new Promise((resolve) => {
            setState({...options, resolve});
        });
    }

    const closeWarning = (result) => {
        if (state && state.resolve) {
            state.resolve(result);
        }
        setState(null);
    }


    return (
        <WarningContext.Provider value={{askWarning}}>
            {children}
            {state && (
                <div className="warning">
                    <div className="warning-menu">
                        <div className="warning-menu-title">
                            <CiWarning />
                            <span>Warning</span>
                            </div>
                        <div className="warning-close" onClick={() => {closeWarning(false)}}>
                            <IoIosCloseCircle />
                        </div>
                    </div>
                    <div className="warning-main-window">
                        <div className="warning-title">
                            <span>{state.title}</span>
                        </div>
                        <div className="warning-message">
                            <span>{state.message}</span>
                        </div>
                        <div className="warning-buttons">
                            <div className="warning-button warning-button-ok" onClick={() => {closeWarning(true)}}>{state.confirmText || 'OK'}</div>
                            <div className="warning-button warning-button-cancel" onClick={() => {closeWarning(false)}}>{state.cancelText || 'Cancel'}</div>
                        </div>
                    </div>
                </div>
            )}
        </WarningContext.Provider>
    );
}
