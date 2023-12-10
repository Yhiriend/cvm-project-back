"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDate = exports.convertMinutesInMillis = void 0;
const convertMinutesInMillis = (minutes) => {
    return minutes * 60 * 1000;
};
exports.convertMinutesInMillis = convertMinutesInMillis;
const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
exports.getCurrentDate = getCurrentDate;
