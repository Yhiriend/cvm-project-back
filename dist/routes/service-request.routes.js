"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_request_controller_1 = require("../controllers/service-request.controller");
const router = (0, express_1.Router)();
router.post("/newrequest", service_request_controller_1.saveServiceRequest);
exports.default = router;
