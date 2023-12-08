"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_request_controller_1 = require("../controllers/review-request.controller");
const router = (0, express_1.Router)();
router.post("/newrequest", review_request_controller_1.saveReviewRequest);
exports.default = router;
