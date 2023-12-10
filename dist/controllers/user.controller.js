"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromToken = exports.updateUser = exports.loginUser = exports.signInUser = void 0;
const user_facade_1 = __importDefault(require("../facades/user.facade"));
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const result = yield user_facade_1.default.signIn(user);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
    finally {
        //connection.end();
    }
});
exports.signInUser = signInUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield user_facade_1.default.loginUser(email, password);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        //connection.end();
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, newPassword } = req.body;
    try {
        const result = yield user_facade_1.default.updateUser(user, newPassword);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        //connection.end();
    }
});
exports.updateUser = updateUser;
const getUserFromToken = (req, res) => {
    const headerToken = req.headers["authorization"];
    if (headerToken) {
        const bearerToken = headerToken.split(" ");
        const result = user_facade_1.default.getUserFromToken(bearerToken[1]);
        res.json(result);
    }
    else {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getUserFromToken = getUserFromToken;
