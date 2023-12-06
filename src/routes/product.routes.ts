import { Router } from "express";
import validateToken from "./validate-token";
import { getNewestProducts, searchProducts, } from "../controllers/product.controller";

const router = Router();

router.get("/getnewest", getNewestProducts);
router.post("/searchproducts", searchProducts);

export default router;
