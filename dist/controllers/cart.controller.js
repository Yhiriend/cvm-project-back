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
Object.defineProperty(exports, "__esModule", { value: true });
class CartController {
    constructor(cartFacade) {
        this.cartFacade = cartFacade;
    }
    saveProductInCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cartId, productId } = req.body;
                const result = yield this.cartFacade.insertProductIntoCart(cartId, productId);
                res.json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: error });
            }
        });
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                const result = yield this.cartFacade.getCartElementsByUserId(userId);
                res.json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: error });
            }
        });
    }
    getByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                const result = yield this.cartFacade.getCartByUserId(userId);
                res.json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: error });
            }
        });
    }
    buyUserCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cartId, totalToPay, paymentMethod, paymentType, address, phone, userId, } = req.body;
                const result = yield this.cartFacade.buyCart(cartId, totalToPay, paymentMethod, paymentType, userId, address, phone);
                res.json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: error });
            }
        });
    }
    removeProductFromUserCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cartId, productId } = req.body;
                const result = yield this.cartFacade.removeProductFromCart(cartId, productId);
                res.json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: error });
            }
        });
    }
}
exports.default = CartController;
