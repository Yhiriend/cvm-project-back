import { Request, Response } from "express";
import * as CartRepository from "../repository/cart.repository";
import { Cart } from "../models/cart.type";

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
