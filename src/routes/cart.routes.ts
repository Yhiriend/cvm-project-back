import { Router } from "express";
import validateToken from "./validate-token";
import {
  buyUserCart,
  getByUserId,
  getCart,
  removeProductFromUserCart,
  saveProductInCart,
} from "../controllers/cart.controller";

const router = Router();

router.post("/saveincart", saveProductInCart);
router.post("/getcart", getCart);
router.post("/getcart-by-userid", getByUserId);
router.post("/buycart", buyUserCart);
router.post("/removeproduct", removeProductFromUserCart);

export default router;
