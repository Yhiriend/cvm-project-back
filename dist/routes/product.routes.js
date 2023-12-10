"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_repository_1 = __importDefault(require("../repository/product.repository"));
const product_facade_1 = __importDefault(require("../facades/product.facade"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const router = (0, express_1.Router)();
const productRepository = new product_repository_1.default();
const productFacade = new product_facade_1.default(productRepository);
const productController = new product_controller_1.default(productFacade);
router.get("/getnewest", (req, res) => productController.getNewestProducts(req, res));
router.post("/searchproducts", (req, res) => productController.searchProducts(req, res));
exports.default = router;
