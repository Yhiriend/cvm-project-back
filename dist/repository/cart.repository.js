"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProductFromCart = exports.buyCart = exports.getCartByUserId = exports.getCartElementsByUserId = exports.insertProductIntoCart = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const product_mappers_1 = require("../utils/adapters/product.mappers");
const insertProductIntoCart = (cartId, productId) => {
    const checkIfExistsSql = "SELECT COUNT(*) AS count FROM cart_elements WHERE product_id = ? AND cart_id = ?";
    return new Promise((resolve, reject) => {
        connection_1.default.query(checkIfExistsSql, [productId, cartId], (checkError, checkResult) => {
            if (checkError) {
                reject(checkError);
            }
            else {
                const productExists = checkResult[0].count > 0;
                if (productExists) {
                    resolve({
                        data: false,
                        message: "El producto ya está en el carrito",
                    });
                }
                else {
                    const insertSql = "INSERT INTO cart_elements (product_id, cart_id) VALUES (?, ?)";
                    connection_1.default.query(insertSql, [productId, cartId], (insertError, insertResult) => {
                        if (insertError) {
                            reject(insertError);
                        }
                        else {
                            if (insertResult.affectedRows > 0) {
                                resolve({ data: true });
                            }
                            else {
                                resolve({ data: false });
                            }
                        }
                    });
                }
            }
        });
    });
};
exports.insertProductIntoCart = insertProductIntoCart;
const getCartElementsByUserId = (userId) => {
    const sql = `
    SELECT c.id AS cartId, c.paid, c.total, ce.*, p.*
    FROM cart c
    LEFT JOIN cart_elements ce ON c.id = ce.cart_id
    LEFT JOIN products p ON ce.product_id = p.id
    WHERE c.user_id = ?
      AND c.paid = false
    ORDER BY c.id DESC;
  `;
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, [userId], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                console.log(result);
                if (result.length === 0) {
                    resolve({
                        data: {
                            productList: [],
                            cartId: null,
                            cartPaid: null,
                            cartTotal: null,
                        },
                    });
                }
                else {
                    const cartId = result[0].cartId || 0;
                    const cartPaid = result[0].paid === 1;
                    const cartTotal = result[0].total;
                    let dataMapped = [];
                    if (result[0].product_id) {
                        dataMapped = result.map((product) => (0, product_mappers_1.mapDbProductToProduct)(product));
                    }
                    resolve({
                        data: { productList: dataMapped, cartId, cartPaid, cartTotal },
                    });
                }
            }
        });
    });
};
exports.getCartElementsByUserId = getCartElementsByUserId;
const getCartByUserId = (userId) => {
    const sql = "SELECT * FROM cart WHERE user_id = ? AND paid = 0 LIMIT 1";
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
const buyCart = (cartId, totalToPay, paymentMethod, userId, address, phone) => {
    const refPurchaseCod = new Date().toISOString().replace(/[-:.]/g, "") +
        "U" +
        userId +
        "C" +
        cartId;
    const purchaseDate = new Date().toISOString().slice(0, 10);
    const updateCartSql = "UPDATE cart SET paid = true, total = ? WHERE id = ?";
    const insertBillSql = "INSERT INTO bills (cart_id, purchase_date, valid_purchase, payment_method, reference_code) VALUES (?, ?, false, ?, ?)";
    const insertShippingSql = "INSERT INTO shipping (address, phone, bill_id) VALUES (?, ?, ?)";
    const insertNewCartSql = "INSERT INTO cart (user_id, total, paid) VALUES (?, 0, false)";
    return new Promise((resolve, reject) => {
        connection_1.default.beginTransaction((transactionError) => {
            if (transactionError) {
                reject(transactionError);
                return;
            }
            connection_1.default.query(updateCartSql, [totalToPay, cartId], (updateCartError, updateCartResult) => {
                if (updateCartError) {
                    connection_1.default.rollback(() => {
                        reject(updateCartError);
                    });
                }
                else {
                    connection_1.default.query(insertBillSql, [cartId, purchaseDate, paymentMethod, refPurchaseCod], (insertBillError, insertBillResult) => {
                        if (insertBillError) {
                            connection_1.default.rollback(() => {
                                reject(insertBillError);
                            });
                        }
                        else {
                            const billId = insertBillResult.insertId;
                            if (address && phone) {
                                connection_1.default.query(insertShippingSql, [address, phone, billId], (insertShippingError) => {
                                    if (insertShippingError) {
                                        connection_1.default.rollback(() => {
                                            reject(insertShippingError);
                                        });
                                    }
                                    else {
                                        connection_1.default.query(insertNewCartSql, [userId], (insertNewCartError) => {
                                            if (insertNewCartError) {
                                                connection_1.default.rollback(() => {
                                                    reject(insertNewCartError);
                                                });
                                            }
                                            else {
                                                connection_1.default.commit((commitError) => {
                                                    if (commitError) {
                                                        connection_1.default.rollback(() => {
                                                            reject(commitError);
                                                        });
                                                    }
                                                    else {
                                                        resolve({
                                                            data: true,
                                                            billReference: refPurchaseCod,
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                connection_1.default.query(insertNewCartSql, [userId], (insertNewCartError) => {
                                    if (insertNewCartError) {
                                        connection_1.default.rollback(() => {
                                            reject(insertNewCartError);
                                        });
                                    }
                                    else {
                                        connection_1.default.commit((commitError) => {
                                            if (commitError) {
                                                connection_1.default.rollback(() => {
                                                    reject(commitError);
                                                });
                                            }
                                            else {
                                                resolve({
                                                    data: true,
                                                    billReference: refPurchaseCod,
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        });
    });
};
exports.buyCart = buyCart;
const removeProductFromCart = (cartId, productId) => {
    const sql = `
    DELETE FROM cart_elements
    WHERE cart_id = ? AND product_id = ?;
  `;
    return new Promise((resolve, reject) => {
        connection_1.default.query(sql, [cartId, productId], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                // Check if any rows were affected (indicating a successful deletion)
                const isDeleted = result.affectedRows > 0;
                resolve({ data: isDeleted });
            }
        });
    });
};
exports.removeProductFromCart = removeProductFromCart;
