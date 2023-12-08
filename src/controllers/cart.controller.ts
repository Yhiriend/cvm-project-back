import { Request, Response } from "express";
import * as CartRepository from "../repository/cart.repository";

export const saveProductInCart = async (req: Request, res: Response) => {
  try {
    const { cartId, productId } = req.body;
    const result = await CartRepository.insertProductIntoCart(
      cartId,
      productId
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const result = await CartRepository.getCartElementsByUserId(userId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const result = await CartRepository.getCartByUserId(userId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const buyUserCart = async (req: Request, res: Response) => {
  try {
    const { cartId, totalToPay, paymentMethod, address, phone, userId } = req.body;
    const result = await CartRepository.buyCart(cartId, totalToPay, paymentMethod, userId, address, phone);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const removeProductFromUserCart = async (req: Request, res: Response) => {
  try {
    const { cartId, productId } = req.body;
    const result = await CartRepository.removeProductFromCart(cartId, productId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
