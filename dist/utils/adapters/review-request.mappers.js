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
exports.mapDbToReviewRequest = exports.mapReviewRequestToDb = void 0;
const time_helper_1 = require("../time-helper");
const mapReviewRequestToDb = (reviewRequest) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    return {
        product_brand: reviewRequest.productBrand,
        product_cooling_capacity: (_a = reviewRequest.productCoolingCapacity) !== null && _a !== void 0 ? _a : null,
        product_type: (_b = reviewRequest.productType) !== null && _b !== void 0 ? _b : null,
        product_tech: (_c = reviewRequest.productTech) !== null && _c !== void 0 ? _c : null,
        product_voltage: reviewRequest.productVoltage,
        product_purchase_date: reviewRequest.productPurchaseDate,
        product_desired_price: reviewRequest.productDesiredPrice,
        product_aditional_info: (_d = reviewRequest.productAditionalInfo) !== null && _d !== void 0 ? _d : null,
        customer_name: reviewRequest.customerName,
        customer_surname: reviewRequest.customerSurname,
        customer_address: reviewRequest.customerAddress,
        customer_phone: reviewRequest.customerPhone,
        request_date: (0, time_helper_1.getCurrentDate)(),
    };
});
exports.mapReviewRequestToDb = mapReviewRequestToDb;
const mapDbToReviewRequest = (dbReviewRequest) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h;
    return {
        productBrand: dbReviewRequest.product_brand,
        productCoolingCapacity: (_e = dbReviewRequest.product_cooling_capacity) !== null && _e !== void 0 ? _e : null,
        productType: (_f = dbReviewRequest.product_type) !== null && _f !== void 0 ? _f : null,
        productTech: (_g = dbReviewRequest.product_tech) !== null && _g !== void 0 ? _g : null,
        productVoltage: dbReviewRequest.product_voltage,
        productPurchaseDate: dbReviewRequest.product_purchase_date,
        productDesiredPrice: dbReviewRequest.product_desired_price,
        productAditionalInfo: (_h = dbReviewRequest.product_aditional_info) !== null && _h !== void 0 ? _h : null,
        customerName: dbReviewRequest.customer_name,
        customerSurname: dbReviewRequest.customer_surname,
        customerAddress: dbReviewRequest.customer_address,
        customerPhone: dbReviewRequest.customer_phone,
        requestDate: dbReviewRequest.request_date,
    };
});
exports.mapDbToReviewRequest = mapDbToReviewRequest;
