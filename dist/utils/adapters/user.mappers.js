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
exports.mapDbUserToUser = exports.mapUserToDb = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mapUserToDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
    return {
        name: user.name,
        surname: user.surname,
        password: hashedPassword,
        email: user.email,
        address: user.address,
        gender: user.gender,
        phone: user.phone,
        role: user.role || 'CUSTOMER',
        identification: user.identification || null,
        birthdate: user.birthdate || null
    };
});
exports.mapUserToDb = mapUserToDb;
const mapDbUserToUser = (dbUser) => {
    return {
        id: dbUser.id,
        identification: dbUser.identification || null,
        password: dbUser.password,
        email: dbUser.email,
        phone: dbUser.phone || null,
        address: dbUser.address || null,
        name: dbUser.name,
        surname: dbUser.surname,
        gender: dbUser.gender || null,
        role: dbUser.role,
        birthdate: dbUser.birthdate || null,
    };
};
exports.mapDbUserToUser = mapDbUserToUser;
