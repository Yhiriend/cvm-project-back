import connection from "../db/connection";
import { Product } from "../models/product.type";
import { mapDbProductToProduct } from "../utils/adapters/product.mappers";

export default class ProductRepository {
  constructor() {}

  getNewest() {
    const sql =
      "SELECT * FROM products WHERE products.available = 1 ORDER BY STR_TO_DATE(register_date, '%Y-%m-%d') DESC LIMIT 10";
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result: any) => {
        if (err) {
          reject(err);
        } else {
          if (result.length === 0) {
            resolve({ data: [] });
          } else {
            const dataMapped: Product = result.map((product: any) => {
              return mapDbProductToProduct(product);
            });
            resolve({ data: dataMapped });
          }
        }
      });
    });
  }

  searchProducts(keywords: string) {
    const sql = `
    SELECT * FROM products
    WHERE available = 1 AND tech LIKE '%${keywords}%' ORDER BY STR_TO_DATE(register_date, '%Y-%m-%d') DESC`;

    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result: any) => {
        if (err) {
          reject(err);
        } else {
          const dataMapped: Product[] = result.map((product: any) => {
            return mapDbProductToProduct(product);
          });
          resolve({ data: dataMapped });
        }
      });
    });
  }
}
