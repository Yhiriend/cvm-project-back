"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validate_token_1 = __importDefault(require("./validate-token"));
const user_facade_1 = __importDefault(require("../facades/user.facade"));
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const router = (0, express_1.Router)();
const userRepository = new user_repository_1.default();
const userFacade = new user_facade_1.default(userRepository);
const userController = new user_controller_1.default(userFacade);
router.post("/signin", (req, res) => userController.signInUser(req, res));
router.post("/login", (req, res) => userController.loginUser(req, res));
router.post("/update", validate_token_1.default, (req, res) => userController.updateUser(req, res));
router.get("/getuser", validate_token_1.default, (req, res) => userController.getUserFromToken(req, res));
exports.default = router;
