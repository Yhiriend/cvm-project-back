"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyUserCart = exports.getByUserId = exports.getCart = exports.saveProductInCart = void 0;
const CartRepository = __importStar(require("../repository/cart.repository"));
const saveProductInCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId, productId } = req.body;
        const result = yield CartRepository.insertProductIntoCart(cartId, productId);
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.saveProductInCart = saveProductInCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const result = yield CartRepository.getCartElementsByUserId(userId);
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.getCart = getCart;
const getByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const result = yield CartRepository.getCartByUserId(userId);
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.getByUserId = getByUserId;
const buyUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId, totalToPay, paymentMethod, address, phone, userId } = req.body;
        const result = yield CartRepository.buyCart(cartId, totalToPay, paymentMethod, userId, address, phone);
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.buyUserCart = buyUserCart;
