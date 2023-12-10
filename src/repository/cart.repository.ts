import connection from "../db/connection";
import { Cart } from "../models/cart.type";
import {
  DbProduct,
  mapDbProductToProduct,
} from "../utils/adapters/product.mappers";

export default class CartRepository {
  constructor() {}

  async insertProductIntoCart(cartId: number, productId: number) {
    const checkIfExistsSql =
      "SELECT COUNT(*) AS count FROM cart_elements WHERE product_id = ? AND cart_id = ?";

    return new Promise((resolve, reject) => {
      connection.query(
        checkIfExistsSql,
        [productId, cartId],
        (checkError, checkResult: any) => {
          if (checkError) {
            reject(checkError);
          } else {
            const productExists = checkResult[0].count > 0;

            if (productExists) {
              resolve({
                data: false,
                message: "El producto ya está en el carrito",
              });
            } else {
              const insertSql =
                "INSERT INTO cart_elements (product_id, cart_id) VALUES (?, ?)";
              connection.query(
                insertSql,
                [productId, cartId],
                (insertError, insertResult: any) => {
                  if (insertError) {
                    reject(insertError);
                  } else {
                    if (insertResult.affectedRows > 0) {
                      resolve({ data: true });
                    } else {
                      resolve({ data: false });
                    }
                  }
                }
              );
            }
          }
        }
      );
    });
  }

  async getCartElementsByUserId(userId: number) {
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
      connection.query(sql, [userId], (err, result: any) => {
        if (err) {
          reject(err);
        } else {
          if (result.length === 0) {
            resolve({
              data: {
                productList: [],
                cartId: null,
                cartPaid: null,
                cartTotal: null,
              },
            });
          } else {
            const cartId = result[0].cartId || 0;
            const cartPaid = result[0].paid === 1;
            const cartTotal = result[0].total;
            let dataMapped: any[] = [];
            if (result[0].product_id) {
              dataMapped = result.map((product: DbProduct) =>
                mapDbProductToProduct(product)
              );
            }
            resolve({
              data: { productList: dataMapped, cartId, cartPaid, cartTotal },
            });
          }
        }
      });
    });
  }

  async getCartByUserId(userId: number) {
    const sql = "SELECT * FROM cart WHERE user_id = ? AND paid = 0 LIMIT 1";

    return new Promise((resolve, reject) => {
      connection.query(sql, [userId], (err, result: any) => {
        if (err) {
          reject(err);
        } else {
          if (result.length === 0) {
            resolve({ data: null });
          } else {
            const cart: Cart = {
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
  }

  async buyCart(
    cartId: number,
    totalToPay: number,
    paymentMethod: number,
    paymentType: string,
    userId: number,
    address?: string,
    phone?: string
  ) {
    let userIdAdapted;
    let cartIdAdapted;
    if (!userId) {
      userIdAdapted = 0;
      cartIdAdapted = 0;
    } else {
      userIdAdapted = userId;
      cartIdAdapted = cartId;
    }

    const refPurchaseCod =
      new Date().toISOString().replace(/[-:.]/g, "") +
      "U" +
      userIdAdapted +
      "C" +
      cartIdAdapted;

    const purchaseDate = new Date().toISOString().slice(0, 10);

    const updateCartSql =
      userId === null
        ? null
        : "UPDATE cart SET paid = true, total = ? WHERE id = ?";

    const insertBillSql =
      userId === null
        ? "INSERT INTO bills (reference_code, cart_id, purchase_date, valid_purchase, payment_method, payment_type) VALUES (?, NULL, ?, false, ?, ?)"
        : "INSERT INTO bills (cart_id, purchase_date, valid_purchase, payment_method, payment_type, reference_code) VALUES (?, ?, false, ?, ?, ?)";

    const insertShippingSql =
      "INSERT INTO shipping (address, phone, bill_id) VALUES (?, ?, ?)";

    const insertNewCartSql =
      userId === null
        ? null
        : "INSERT INTO cart (user_id, total, paid) VALUES (?, 0, false)";

    return new Promise((resolve, reject) => {
      connection.beginTransaction((transactionError) => {
        if (transactionError) {
          reject(transactionError);
          return;
        }

        if (updateCartSql) {
          connection.query(
            updateCartSql,
            [totalToPay, cartId],
            (updateCartError, updateCartResult) => {
              if (updateCartError) {
                connection.rollback(() => {
                  reject(updateCartError);
                });
              } else {
                executeInsertions();
              }
            }
          );
        } else {
          executeInsertions();
        }

        function executeInsertions() {
          connection.query(
            insertBillSql,
            userId === null
              ? [refPurchaseCod, purchaseDate, paymentMethod, paymentType]
              : [
                  cartId,
                  purchaseDate,
                  paymentMethod,
                  paymentType,
                  refPurchaseCod,
                ],
            (insertBillError, insertBillResult: any) => {
              if (insertBillError) {
                connection.rollback(() => {
                  reject(insertBillError);
                });
              } else {
                const billId = insertBillResult.insertId;

                if (address && phone) {
                  connection.query(
                    insertShippingSql,
                    [address, phone, billId],
                    (insertShippingError) => {
                      if (insertShippingError) {
                        connection.rollback(() => {
                          reject(insertShippingError);
                        });
                      } else {
                        if (insertNewCartSql) {
                          connection.query(
                            insertNewCartSql,
                            [userId],
                            (insertNewCartError) => {
                              if (insertNewCartError) {
                                connection.rollback(() => {
                                  reject(insertNewCartError);
                                });
                              } else {
                                commitTransaction();
                              }
                            }
                          );
                        } else {
                          commitTransaction();
                        }
                      }
                    }
                  );
                } else {
                  if (insertNewCartSql) {
                    connection.query(
                      insertNewCartSql,
                      [userId],
                      (insertNewCartError) => {
                        if (insertNewCartError) {
                          connection.rollback(() => {
                            reject(insertNewCartError);
                          });
                        } else {
                          commitTransaction();
                        }
                      }
                    );
                  } else {
                    commitTransaction();
                  }
                }
              }
            }
          );
        }

        function commitTransaction() {
          connection.commit((commitError) => {
            if (commitError) {
              connection.rollback(() => {
                reject(commitError);
              });
            } else {
              resolve({
                data: true,
                billReference: refPurchaseCod,
              });
            }
          });
        }
      });
    });
  }

  async removeProductFromCart(cartId: number, productId: number) {
    const sql = `
    DELETE FROM cart_elements
    WHERE cart_id = ? AND product_id = ?;
  `;

    return new Promise((resolve, reject) => {
      connection.query(sql, [cartId, productId], (err, result: any) => {
        if (err) {
          reject(err);
        } else {
          const isDeleted = result.affectedRows > 0;
          resolve({ data: isDeleted });
        }
      });
    });
  }
}
