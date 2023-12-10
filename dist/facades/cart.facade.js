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
class CartFacade {
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    insertProductIntoCart(cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cartRepository.insertProductIntoCart(cartId, productId);
            }
            catch (error) {
                console.error(error);
                throw new Error("Error during insertProductIntoCart process");
            }
        });
    }
    getCartElementsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cartRepository.getCartElementsByUserId(userId);
            }
            catch (error) {
                console.error(error);
                throw new Error("Error during getCartElementsByUserId process");
            }
        });
    }
    getCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cartRepository.getCartByUserId(userId);
            }
            catch (error) {
                console.error(error);
                throw new Error("Error during getCartByUserId process");
            }
        });
    }
    buyCart(cartId, totalToPay, paymentMethod, paymentType, userId, address, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cartRepository.buyCart(cartId, totalToPay, paymentMethod, paymentType, userId, address, phone);
            }
            catch (error) {
                console.error(error);
                throw new Error("Error during buyCart process");
            }
        });
    }
    removeProductFromCart(cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cartRepository.removeProductFromCart(cartId, productId);
            }
            catch (error) {
                console.error(error);
                throw new Error("Error during removeProductFromCart process");
            }
        });
    }
}
exports.default = CartFacade;
