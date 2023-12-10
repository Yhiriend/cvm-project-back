import { Request, Response } from "express";
import CartFacade from "../facades/cart.facade";

export default class CartController {
  constructor(private cartFacade: CartFacade) {}

  async saveProductInCart(req: Request, res: Response) {
    try {
      const { cartId, productId } = req.body;
      const result = await this.cartFacade.insertProductIntoCart(
        cartId,
        productId
      );
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }

  async getCart(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const result = await this.cartFacade.getCartElementsByUserId(userId);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }

  async getByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const result = await this.cartFacade.getCartByUserId(userId);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }

  async buyUserCart(req: Request, res: Response) {
    try {
      const {
        cartId,
        totalToPay,
        paymentMethod,
        paymentType,
        address,
        phone,
        userId,
      } = req.body;
      const result = await this.cartFacade.buyCart(
        cartId,
        totalToPay,
        paymentMethod,
        paymentType,
        userId,
        address,
        phone
      );
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }

  async removeProductFromUserCart(req: Request, res: Response) {
    try {
      const { cartId, productId } = req.body;
      const result = await this.cartFacade.removeProductFromCart(
        cartId,
        productId
      );
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
}
