import connection from "../db/connection";
import { Cart } from "../models/cart.type";
import {
  DbProduct,
  mapDbProductToProduct,
} from "../utils/adapters/product.mappers";

export const insertProductIntoCart = (cartId: number, productId: number) => {
  const checkIfExistsSql =
    "SELECT COUNT(*) AS count FROM cart_elements WHERE product_id = ? AND cart_id = ?";

  return new Promise((resolve, reject) => {
    connection.query(
      checkIfExistsSql,
      [productId, cartId],
      (checkError, checkResult) => {
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
              (insertError, insertResult) => {
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
};

export const getCartElementsByUserId = (userId: number) => {
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
    connection.query(sql, [userId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log(result)
        if (result.length === 0) {
          resolve({
            data: { productList: [], cartId: null, cartPaid: null, cartTotal: null },
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
};

export const getCartByUserId = (userId: number) => {
  const sql = "SELECT * FROM cart WHERE user_id = ? AND paid = 0 LIMIT 1";

  return new Promise((resolve, reject) => {
    connection.query(sql, [userId], (err, result) => {
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
};

export const buyCart = (
  cartId: number,
  totalToPay: number,
  paymentMethod: number,
  userId: number,
  address?: string,
  phone?: string
) => {
  const purchaseDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  const updateCartSql = "UPDATE cart SET paid = true, total = ? WHERE id = ?";

  const insertBillSql =
    "INSERT INTO bills (cart_id, purchase_date, valid_purchase, payment_method) VALUES (?, ?, false, ?)";

  const insertShippingSql =
    "INSERT INTO shipping (address, phone, bill_id) VALUES (?, ?, ?)";

  const insertNewCartSql =
    "INSERT INTO cart (user_id, total, paid) VALUES (?, 0, false)";

  return new Promise((resolve, reject) => {
    connection.beginTransaction((transactionError) => {
      if (transactionError) {
        reject(transactionError);
        return;
      }

      connection.query(
        updateCartSql,
        [totalToPay, cartId],
        (updateCartError, updateCartResult) => {
          if (updateCartError) {
            connection.rollback(() => {
              reject(updateCartError);
            });
          } else {
            connection.query(
              insertBillSql,
              [cartId, purchaseDate, paymentMethod],
              (insertBillError, insertBillResult) => {
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
                          connection.query(
                            insertNewCartSql,
                            [userId],
                            (insertNewCartError) => {
                              if (insertNewCartError) {
                                connection.rollback(() => {
                                  reject(insertNewCartError);
                                });
                              } else {
                                connection.commit((commitError) => {
                                  if (commitError) {
                                    connection.rollback(() => {
                                      reject(commitError);
                                    });
                                  } else {
                                    resolve({ data: true });
                                  }
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  } else {
                    connection.query(
                      insertNewCartSql,
                      [userId],
                      (insertNewCartError) => {
                        if (insertNewCartError) {
                          connection.rollback(() => {
                            reject(insertNewCartError);
                          });
                        } else {
                          connection.commit((commitError) => {
                            if (commitError) {
                              connection.rollback(() => {
                                reject(commitError);
                              });
                            } else {
                              resolve({ data: true });
                            }
                          });
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        }
      );
    });
  });
};
