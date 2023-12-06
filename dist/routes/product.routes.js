"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
router.get("/getnewest", product_controller_1.getNewestProducts);
router.post("/searchproducts", product_controller_1.searchProducts);
exports.default = router;
