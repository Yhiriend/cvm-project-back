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
exports.mapDbProductToProduct = exports.mapProductToDb = void 0;
const mapProductToDb = (product) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        brand: product.brand,
        tech: product.tech,
        price: product.price,
        reference: product.reference,
        voltage: product.voltage.toString() || '110',
        type: product.type,
        state: product.state.toString(),
        register_date: product.registerDate,
        description: product.description || null,
        image: product.image || null,
    };
});
exports.mapProductToDb = mapProductToDb;
const mapDbProductToProduct = (dbProduct) => {
    return {
        id: dbProduct.id,
        brand: dbProduct.brand,
        tech: dbProduct.tech,
        price: dbProduct.price,
        reference: dbProduct.reference,
        voltage: Number(dbProduct.voltage),
        type: dbProduct.type,
        state: Number(dbProduct.state),
        registerDate: dbProduct.register_date,
        description: dbProduct.description,
        image: dbProduct.image,
    };
};
exports.mapDbProductToProduct = mapDbProductToProduct;
