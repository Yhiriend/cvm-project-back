"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefCode = void 0;
const generateRefCode = (element1, element2) => {
    return (new Date().toISOString().replace(/[-:.]/g, "") +
        "U" +
        element1 +
        "C" +
        element2);
};
exports.generateRefCode = generateRefCode;
