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
exports.mapDbToServiceRequest = exports.mapServiceRequestToDb = void 0;
const reference_coder_1 = require("../reference-coder");
const time_helper_1 = require("../time-helper");
const mapServiceRequestToDb = (reviewRequest) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    return {
        reference_code: (0, reference_coder_1.generateRefCode)('0', '0'),
        service_type: reviewRequest.serviceType.toUpperCase(),
        product_brand: reviewRequest.productBrand.toUpperCase(),
        product_type: (_a = reviewRequest.productType.toUpperCase()) !== null && _a !== void 0 ? _a : null,
        product_tech: (_b = reviewRequest.productTech.toUpperCase()) !== null && _b !== void 0 ? _b : null,
        product_voltage: reviewRequest.productVoltage,
        product_aditional_info: (_c = reviewRequest.productAditionalInfo) !== null && _c !== void 0 ? _c : null,
        customer_name: reviewRequest.customerName.toUpperCase(),
        customer_surname: reviewRequest.customerSurname.toUpperCase(),
        customer_address: reviewRequest.customerAddress.toUpperCase(),
        customer_phone: reviewRequest.customerPhone,
        request_date: (0, time_helper_1.getCurrentDate)(),
    };
});
exports.mapServiceRequestToDb = mapServiceRequestToDb;
const mapDbToServiceRequest = (dbReviewRequest) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    return {
        id: dbReviewRequest.id,
        referenceCode: dbReviewRequest.reference_code,
        serviceType: dbReviewRequest.service_type,
        productBrand: dbReviewRequest.product_brand,
        productType: (_d = dbReviewRequest.product_type) !== null && _d !== void 0 ? _d : null,
        productTech: (_e = dbReviewRequest.product_tech) !== null && _e !== void 0 ? _e : null,
        productVoltage: dbReviewRequest.product_voltage,
        productAditionalInfo: (_f = dbReviewRequest.product_aditional_info) !== null && _f !== void 0 ? _f : null,
        customerName: dbReviewRequest.customer_name,
        customerSurname: dbReviewRequest.customer_surname,
        customerAddress: dbReviewRequest.customer_address,
        customerPhone: dbReviewRequest.customer_phone,
        requestDate: dbReviewRequest.request_date,
    };
});
exports.mapDbToServiceRequest = mapDbToServiceRequest;
