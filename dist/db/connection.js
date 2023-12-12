"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DatabaseConnection {
    constructor() {
        console.log(process.env.DATABASE_PORT, process.env.DATABASE_NAME);
        this.connection = mysql2_1.default.createConnection({
            port: Number(process.env.DATABASE_PORT),
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
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
