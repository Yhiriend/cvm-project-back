"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromToken = exports.updateUser = exports.loginUser = exports.signInUser = void 0;
const UserRepository = __importStar(require("../repository/user.repository"));
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const result = yield UserRepository.signIn(user);
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
        const result = yield UserRepository.login(email, password);
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
        const result = yield UserRepository.update(user, newPassword);
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
        const result = UserRepository.getUser(bearerToken[1]);
        res.json(result);
    }
    else {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getUserFromToken = getUserFromToken;
