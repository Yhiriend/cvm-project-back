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
exports.saveNewReviewRequest = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const review_request_mappers_1 = require("../utils/adapters/review-request.mappers");
const saveNewReviewRequest = (reviewRequest) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mappedReviewRequest = yield (0, review_request_mappers_1.mapReviewRequestToDb)(reviewRequest);
        const sql = "INSERT INTO review_requests SET ?";
        return new Promise((resolve, reject) => {
            connection_1.default.query(sql, mappedReviewRequest, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ data: true });
                }
            });
        });
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
});
exports.saveNewReviewRequest = saveNewReviewRequest;
