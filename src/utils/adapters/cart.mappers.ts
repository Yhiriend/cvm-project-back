import { AirConditioner } from "../../models/airconditioner.type";
import { Cart } from "../../models/cart.type";

export interface DbCart {
  id?: number;
  user_id: number;
  total: number;
  productList: AirConditioner[]
}

export const mapCartToDb = async (
  cart: Cart
): Promise<Cart> => {
  return {
    id: cart.id,
    user_id: cart.user_id,
    total: cart.total,
    productListId: cart.productListId,
    paid: cart.paid
  };
};

