import { Request, Response } from "express";
import ProductFacade from "../facades/product.facade";

export const getNewestProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductFacade.getNewestProducts();
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const keywords: string = req.body.keywords || "";
    const result = await ProductFacade.searchProducts(keywords);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
