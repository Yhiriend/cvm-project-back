"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_request_controller_1 = __importDefault(require("../controllers/review-request.controller"));
const review_request_repository_1 = __importDefault(require("../repository/review-request.repository"));
const review_request_facade_1 = __importDefault(require("../facades/review-request.facade"));
const router = (0, express_1.Router)();
const reviewRequestRepository = new review_request_repository_1.default();
const reviewRequestFacade = new review_request_facade_1.default(reviewRequestRepository);
const reviewRequestController = new review_request_controller_1.default(reviewRequestFacade);
router.post("/newrequest", (req, res) => reviewRequestController.saveReviewRequest(req, res));
exports.default = router;
