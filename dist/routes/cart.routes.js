"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const router = (0, express_1.Router)();
router.post("/saveincart", cart_controller_1.saveProductInCart);
router.post("/getcart", cart_controller_1.getCart);
router.post("/getcart-by-userid", cart_controller_1.getByUserId);
exports.default = router;
