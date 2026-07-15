import React from 'react';

export function formatDateTime(dateValue, format = "datetime") {
    const date = new Date(dateValue);

    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const HH = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");

    switch (format) {
        case 'datewithdash': 
            return `${yyyy}-${MM}-${dd}`;
        case 'date':
            return `${dd}.${MM}.${yyyy}`;
        case 'time':
            return `${HH}:${mm}`;
        case 'shortmonth':
            return date.toLocaleString('default', { month: 'short' }) + ` ${dd}`;    
        default:
            return `${dd}.${mm}.${yyyy} ${HH}:${mm}`;
            break;
    }
}