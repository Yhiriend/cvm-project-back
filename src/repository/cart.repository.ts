import connection from "../db/connection";
import { AirConditioner } from "../models/airconditioner.type";
import { Cart } from "../models/cart.type";
import { DbProduct, mapDbProductToProduct } from "../utils/adapters/product.mappers";

export const insertProductIntoCart = (cartId: number, productId: number) => {
  const sql = "INSERT INTO cart_elements (product_id, cart_id) VALUES (?, ?)";

  return new Promise((resolve, reject) => {
    connection.query(sql, [productId, cartId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.affectedRows > 0) {
          resolve({ data: true });
        } else {
          resolve({ data: false });
        }
      }
    });
  });
};

export const getCartElementsByUserId = (userId: number) => {
    const sql = `
      SELECT ce.*, p.*, c.id as cartId, c.paid as cartPaid, c.total as cartTotal
      FROM cart_elements ce
      JOIN products p ON ce.product_id = p.id
      JOIN cart c ON ce.cart_id = c.id
      WHERE c.user_id = ?
    `;

    return new Promise((resolve, reject) => {
      connection.query(sql, [userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.length === 0) {
            resolve({ data: { productList: [], cartId: 0, cartPaid: false, cartTotal: 0 } });
          } else {
            const cartId = result[0].cartId;
            const cartPaid = result[0].cartPaid===1;
            const cartTotal = result[0].cartTotal;

            const dataMapped = result.map((product: DbProduct) => mapDbProductToProduct(product));

            resolve({ data: { productList: dataMapped, cartId, cartPaid, cartTotal } });
          }
        }
      });
    });
  };


export const getCartByUserId = (userId: number) => {
  const sql = "SELECT * FROM cart WHERE user_id = ? AND paid = false LIMIT 1";

  return new Promise((resolve, reject) => {
    connection.query(sql, [userId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.length === 0) {
          resolve({data: null});
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

