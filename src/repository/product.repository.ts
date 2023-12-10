import connection from "../db/connection";
import { AirConditioner } from "../models/airconditioner.type";
import { mapDbProductToProduct } from "../utils/adapters/product.mappers";

export const getNewest = () => {
  const sql =
    "SELECT * FROM products WHERE products.available = 1 ORDER BY STR_TO_DATE(register_date, '%Y-%m-%d') DESC LIMIT 10";
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.length === 0) {
          resolve({ data: [] });
        } else {
          const dataMapped: AirConditioner = result.map((product: any) => {
            return mapDbProductToProduct(product);
          });
          resolve({ data: dataMapped });
        }
      }
    });
  });
};

export const searchProducts = (keywords: string) => {
  const sql = `
    SELECT * FROM products
    WHERE available = 1 AND brand LIKE '%${keywords}%' ORDER BY STR_TO_DATE(register_date, '%Y-%m-%d') DESC`;

  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const dataMapped: AirConditioner[] = result.map((product: any) => {
          return mapDbProductToProduct(product);
        });
        resolve({ data: dataMapped });
      }
    });
  });
};
