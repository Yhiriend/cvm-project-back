import { Router } from "express";
import validateToken from "./validate-token";
import CartRepository from "../repository/cart.repository";
import CartFacade from "../facades/cart.facade";
import CartController from "../controllers/cart.controller";

const router = Router();
const cartRepository = new CartRepository();
const cartFacade = new CartFacade(cartRepository);
const cartController = new CartController(cartFacade);

router.post("/saveincart", (req, res) =>
  cartController.saveProductInCart(req, res)
);
router.post("/getcart", (req, res) => cartController.getCart(req, res));
router.post("/getcart-by-userid", (req, res) =>
  cartController.getByUserId(req, res)
);
router.post("/buycart", (req, res) => cartController.buyUserCart(req, res));
router.post("/removeproduct", (req, res) =>
  cartController.removeProductFromUserCart(req, res)
);

export default router;
