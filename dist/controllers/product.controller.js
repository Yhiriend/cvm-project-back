"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.getNewestProducts = void 0;
const product_facade_1 = __importDefault(require("../facades/product.facade"));
const getNewestProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_facade_1.default.getNewestProducts();
        console.log(result);
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.getNewestProducts = getNewestProducts;
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keywords = req.body.keywords || "";
        const result = yield product_facade_1.default.searchProducts(keywords);
        console.log(result);
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.searchProducts = searchProducts;
