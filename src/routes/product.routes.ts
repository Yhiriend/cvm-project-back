import { Router } from "express";
import validateToken from "./validate-token";
import ProductRepository from "../repository/product.repository";
import ProductFacade from "../facades/product.facade";
import ProductController from "../controllers/product.controller";

const router = Router();
const productRepository = new ProductRepository();
const productFacade = new ProductFacade(productRepository);
const productController = new ProductController(productFacade);

router.get("/getnewest", (req, res) =>
  productController.getNewestProducts(req, res)
);
router.post("/searchproducts", (req, res) =>
  productController.searchProducts(req, res)
);

export default router;
