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
exports.getUser = exports.update = exports.signIn = exports.login = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const time_converter_1 = __importDefault(require("../utils/time-converter"));
const user_mappers_1 = require("../utils/adapters/user.mappers");
const EXPIRATION_TIME = (0, time_converter_1.default)(60);
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = "SELECT * FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, [email], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                reject(err);
            }
            else {
                let data = {};
                if (result.length === 0) {
                    resolve({ msg: "Invalid Email", data: false });
                }
                else {
                    data = result[0];
                    const userPassword = data.password;
                    try {
                        const passwordMatch = yield bcrypt_1.default.compare(password, userPassword);
                        if (passwordMatch) {
                            const token = jsonwebtoken_1.default.sign((0, user_mappers_1.mapDbUserToUser)(data), process.env.SECRET_KEY, {
                                expiresIn: EXPIRATION_TIME.toString(),
                            });
                            const dataWithoutPassword = yield (0, user_mappers_1.mapUserToDb)((0, user_mappers_1.mapDbUserToUser)(data));
                            delete dataWithoutPassword.password;
                            resolve({ token, data: dataWithoutPassword });
                        }
                        else {
                            resolve({ msg: "Invalid Password" });
                        }
                    }
                    catch (err) {
                        reject(err.message);
                    }
                }
            }
        }));
    });
});
exports.login = login;
const signIn = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUser = yield (0, user_mappers_1.mapUserToDb)(user);
        const insertResult = yield new Promise((resolve, reject) => {
            connection_1.default.query("INSERT INTO users SET ?", dbUser, (err, data) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve(data.insertId);
                }
            });
        });
        const selectResult = yield new Promise((resolve, reject) => {
            const sql = "SELECT * FROM users WHERE id = ?";
            connection_1.default.query(sql, [insertResult], (err, data) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    if (data.length > 0) {
                        const dataMapped = (0, user_mappers_1.mapDbUserToUser)(data[0]);
                        const token = jsonwebtoken_1.default.sign(dataMapped, process.env.SECRET_KEY, {
                            expiresIn: EXPIRATION_TIME.toString(),
                        });
                        delete dataMapped.password;
                        resolve({ token: token, data: dataMapped });
                    }
                    else {
                        reject("User not found");
                    }
                }
            });
        });
        return selectResult;
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
});
exports.signIn = signIn;
const update = (user, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        connection_1.default.query("SELECT * FROM users WHERE id = ?", [user.id], (err, result) => {
            if (err) {
                reject(err.message);
            }
            else {
                if (result.length === 0) {
                    reject("Invalid user");
                }
                else {
                    const updateData = user;
                    bcrypt_1.default.compare(user.password, result[0].password, (err, result) => {
                        if (err) {
                            resolve(err.message);
                        }
                        else {
                            if (result) {
                                if (newPassword) {
                                    bcrypt_1.default.hash(newPassword, 10).then((hash) => {
                                        updateData.password = hash;
                                        connection_1.default.query("UPDATE users SET ? WHERE id = ?", [updateData, user.id], (err, data) => {
                                            if (err) {
                                                reject(err.message);
                                            }
                                            else {
                                                if (data.affectedRows > 0) {
                                                    resolve({ msg: true });
                                                }
                                            }
                                        });
                                    });
                                }
                                else {
                                    //delete updateData.password;
                                    connection_1.default.query("UPDATE users SET ? WHERE id = ?", [updateData, user.id], (err, data) => {
                                        if (err) {
                                            reject(err.message);
                                        }
                                        else {
                                            resolve({
                                                msg: true,
                                            });
                                        }
                                    });
                                }
                            }
                            else {
                                resolve({ msg: false });
                            }
                        }
                    });
                }
            }
        });
    });
});
exports.update = update;
const getUser = (token) => {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (decodedToken) {
            delete decodedToken.password;
            const response = {
                data: (0, user_mappers_1.mapDbUserToUser)(decodedToken)
            };
            return response;
        }
        return null;
    }
    catch (error) {
        console.error("Error al decodificar el token:", error.message);
        return null;
    }
};
exports.getUser = getUser;
