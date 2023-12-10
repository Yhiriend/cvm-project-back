"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
class DatabaseConnection {
    constructor() {
        this.connection = mysql2_1.default.createConnection({
            port: 55139,
            host: "monorail.proxy.rlwy.net",
            user: "root",
            password: "Gb2Fga-Cd2HfG-fD-c65gg-31beFGfBd",
            database: "railway",
            authPlugins: {
                mysql_clear_password: () => () => Buffer.from(process.env.PASSWORD_BD + "\0"),
            },
        });
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    getConnection() {
        return this.connection;
    }
}
const connection = DatabaseConnection.getInstance().getConnection();
exports.default = connection;
