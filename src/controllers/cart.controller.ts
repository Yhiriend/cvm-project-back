import { Request, Response } from "express";
import CartFacade from "../facades/cart.facade";

export const saveProductInCart = async (req: Request, res: Response) => {
  try {
    const { cartId, productId } = req.body;
    const result = await CartFacade.insertProductIntoCart(cartId, productId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const result = await CartFacade.getCartElementsByUserId(userId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const result = await CartFacade.getCartByUserId(userId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const buyUserCart = async (req: Request, res: Response) => {
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
    const result = await CartFacade.buyCart(
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
};

export const removeProductFromUserCart = async (
  req: Request,
  res: Response
) => {
  try {
    const { cartId, productId } = req.body;
    const result = await CartFacade.removeProductFromCart(cartId, productId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
