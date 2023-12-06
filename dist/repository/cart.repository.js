"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartByUserId = exports.getCartElementsByUserId = exports.insertProductIntoCart = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const product_mappers_1 = require("../utils/adapters/product.mappers");
const insertProductIntoCart = (cartId, productId) => {
    const sql = "INSERT INTO cart_elements (product_id, cart_id) VALUES (?, ?)";
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, [productId, cartId], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                if (result.affectedRows > 0) {
                    resolve({ data: true });
                }
                else {
                    resolve({ data: false });
                }
            }
        });
    });
};
exports.insertProductIntoCart = insertProductIntoCart;
const getCartElementsByUserId = (userId) => {
    const sql = `
      SELECT ce.*, p.*, c.id as cartId, c.paid as cartPaid, c.total as cartTotal
      FROM cart_elements ce
      JOIN products p ON ce.product_id = p.id
      JOIN cart c ON ce.cart_id = c.id
      WHERE c.user_id = ?
    `;
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, [userId], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                if (result.length === 0) {
                    resolve({ data: { productList: [], cartId: 0, cartPaid: false, cartTotal: 0 } });
                }
                else {
                    const cartId = result[0].cartId;
                    const cartPaid = result[0].cartPaid === 1;
                    const cartTotal = result[0].cartTotal;
                    const dataMapped = result.map((product) => (0, product_mappers_1.mapDbProductToProduct)(product));
                    resolve({ data: { productList: dataMapped, cartId, cartPaid, cartTotal } });
                }
            }
        });
    });
};
exports.getCartElementsByUserId = getCartElementsByUserId;
const getCartByUserId = (userId) => {
    const sql = "SELECT * FROM cart WHERE user_id = ? AND paid = false LIMIT 1";
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, [userId], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                if (result.length === 0) {
                    resolve({ data: null });
                }
                else {
                    const cart = {
                        id: result[0].id,
                        user_id: result[0].user_id,
                        total: result[0].total,
                        paid: result[0].paid,
                    };
                    resolve(cart);
                }
            }
        });
    });
};
exports.getCartByUserId = getCartByUserId;
