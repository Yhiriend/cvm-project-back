"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.post('/signin', user_controller_1.signInUser);
router.post('/login', user_controller_1.loginUser);
router.post('/update', validate_token_1.default, user_controller_1.updateUser);
router.get('/getuser', validate_token_1.default, user_controller_1.getUserFromToken);
exports.default = router;
