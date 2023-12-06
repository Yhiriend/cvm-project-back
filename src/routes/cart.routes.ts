import { Router } from "express";
import validateToken from "./validate-token";
import { getByUserId, getCart, saveProductInCart } from "../controllers/cart.controller";

const router = Router();

router.post("/saveincart", saveProductInCart);
router.post("/getcart", getCart);
router.post("/getcart-by-userid", getByUserId);

export default router;