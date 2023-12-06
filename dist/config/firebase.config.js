"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const firebaseConfig = {
    apiKey: "AIzaSyDU6Lj0f5DPgeKWcF6pS9X6vooxMSglN8U",
    authDomain: "cvm-aa.firebaseapp.com",
    projectId: "cvm-aa",
    storageBucket: "cvm-aa.appspot.com",
    messagingSenderId: "306704291260",
    appId: "1:306704291260:web:a476fb46f9a407926347b9"
};
const firebase = (0, app_1.initializeApp)(firebaseConfig);
exports.default = firebase;
