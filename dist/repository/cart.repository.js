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
const connection_1 = __importDefault(require("../db/connection"));
const product_mappers_1 = require("../utils/adapters/product.mappers");
class CartRepository {
    constructor() { }
    insertProductIntoCart(cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    getCartElementsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    getCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    buyCart(cartId, totalToPay, paymentMethod, paymentType, userId, address, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let userIdAdapted;
            let cartIdAdapted;
            if (!userId) {
                userIdAdapted = 0;
                cartIdAdapted = 0;
            }
            else {
                userIdAdapted = userId;
                cartIdAdapted = cartId;
            }
            const refPurchaseCod = new Date().toISOString().replace(/[-:.]/g, "") +
                "U" +
                userIdAdapted +
                "C" +
                cartIdAdapted;
            const purchaseDate = new Date().toISOString().slice(0, 10);
            const updateCartSql = userId === null
                ? null
                : "UPDATE cart SET paid = true, total = ? WHERE id = ?";
            const insertBillSql = userId === null
                ? "INSERT INTO bills (reference_code, cart_id, purchase_date, valid_purchase, payment_method, payment_type) VALUES (?, NULL, ?, false, ?, ?)"
                : "INSERT INTO bills (cart_id, purchase_date, valid_purchase, payment_method, payment_type, reference_code) VALUES (?, ?, false, ?, ?, ?)";
            const insertShippingSql = "INSERT INTO shipping (address, phone, bill_id) VALUES (?, ?, ?)";
            const insertNewCartSql = userId === null
                ? null
                : "INSERT INTO cart (user_id, total, paid) VALUES (?, 0, false)";
            return new Promise((resolve, reject) => {
                connection_1.default.beginTransaction((transactionError) => {
                    if (transactionError) {
                        reject(transactionError);
                        return;
                    }
                    if (updateCartSql) {
                        connection_1.default.query(updateCartSql, [totalToPay, cartId], (updateCartError, updateCartResult) => {
                            if (updateCartError) {
                                connection_1.default.rollback(() => {
                                    reject(updateCartError);
                                });
                            }
                            else {
                                executeInsertions();
                            }
                        });
                    }
                    else {
                        executeInsertions();
                    }
                    function executeInsertions() {
                        connection_1.default.query(insertBillSql, userId === null
                            ? [refPurchaseCod, purchaseDate, paymentMethod, paymentType]
                            : [
                                cartId,
                                purchaseDate,
                                paymentMethod,
                                paymentType,
                                refPurchaseCod,
                            ], (insertBillError, insertBillResult) => {
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
                                            if (insertNewCartSql) {
                                                connection_1.default.query(insertNewCartSql, [userId], (insertNewCartError) => {
                                                    if (insertNewCartError) {
                                                        connection_1.default.rollback(() => {
                                                            reject(insertNewCartError);
                                                        });
                                                    }
                                                    else {
                                                        commitTransaction();
                                                    }
                                                });
                                            }
                                            else {
                                                commitTransaction();
                                            }
                                        }
                                    });
                                }
                                else {
                                    if (insertNewCartSql) {
                                        connection_1.default.query(insertNewCartSql, [userId], (insertNewCartError) => {
                                            if (insertNewCartError) {
                                                connection_1.default.rollback(() => {
                                                    reject(insertNewCartError);
                                                });
                                            }
                                            else {
                                                commitTransaction();
                                            }
                                        });
                                    }
                                    else {
                                        commitTransaction();
                                    }
                                }
                            }
                        });
                    }
                    function commitTransaction() {
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
            });
        });
    }
    removeProductFromCart(cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
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
                        const isDeleted = result.affectedRows > 0;
                        resolve({ data: isDeleted });
                    }
                });
            });
        });
    }
}
exports.default = CartRepository;
