"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.getNewest = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const product_mappers_1 = require("../utils/adapters/product.mappers");
const getNewest = () => {
    const sql = "SELECT * FROM products ORDER BY STR_TO_DATE(register_date, '%Y-%m-%d') DESC LIMIT 10";
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                if (result.length === 0) {
                    resolve({ data: [] });
                }
                else {
                    const dataMapped = result.map((product) => {
                        return (0, product_mappers_1.mapDbProductToProduct)(product);
                    });
                    resolve({ data: dataMapped });
                }
            }
        });
    });
};
exports.getNewest = getNewest;
const searchProducts = (keywords) => {
    const sql = `
    SELECT * FROM products
    WHERE brand LIKE '%${keywords}%' ORDER BY STR_TO_DATE(register_date, '%Y-%m-%d') DESC`;
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                const dataMapped = result.map((product) => {
                    return (0, product_mappers_1.mapDbProductToProduct)(product);
                });
                resolve({ data: dataMapped });
            }
        });
    });
};
exports.searchProducts = searchProducts;
