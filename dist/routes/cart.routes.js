"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_repository_1 = __importDefault(require("../repository/cart.repository"));
const cart_facade_1 = __importDefault(require("../facades/cart.facade"));
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const router = (0, express_1.Router)();
const cartRepository = new cart_repository_1.default();
const cartFacade = new cart_facade_1.default(cartRepository);
const cartController = new cart_controller_1.default(cartFacade);
router.post("/saveincart", (req, res) => cartController.saveProductInCart(req, res));
router.post("/getcart", (req, res) => cartController.getCart(req, res));
router.post("/getcart-by-userid", (req, res) => cartController.getByUserId(req, res));
router.post("/buycart", (req, res) => cartController.buyUserCart(req, res));
router.post("/removeproduct", (req, res) => cartController.removeProductFromUserCart(req, res));
exports.default = router;
