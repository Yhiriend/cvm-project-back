"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_request_repository_1 = __importDefault(require("../repository/service-request.repository"));
const service_request_facade_1 = __importDefault(require("../facades/service-request.facade"));
const service_request_controller_1 = __importDefault(require("../controllers/service-request.controller"));
const router = (0, express_1.Router)();
const serviceRequestRepository = new service_request_repository_1.default();
const serviceRequestFacade = new service_request_facade_1.default(serviceRequestRepository);
const serviceRequestController = new service_request_controller_1.default(serviceRequestFacade);
router.post("/newrequest", (req, res) => serviceRequestController.saveServiceRequest(req, res));
exports.default = router;
