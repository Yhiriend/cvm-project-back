import { Request, Response } from "express";
import ProductFacade from "../facades/product.facade";

export default class ProductController {
  constructor(private productFacade: ProductFacade) {}

  async getNewestProducts(req: Request, res: Response) {
    try {
      const result = await this.productFacade.getNewestProducts();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }

  async searchProducts(req: Request, res: Response) {
    try {
      const keywords: string = req.body.keywords || "";
      const result = await this.productFacade.searchProducts(keywords);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
}
