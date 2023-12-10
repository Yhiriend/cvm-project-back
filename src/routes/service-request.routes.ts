import { Router } from "express";
import validateToken from "./validate-token";
import ServiceRequestRepository from "../repository/service-request.repository";
import ServiceRequestFacade from "../facades/service-request.facade";
import ServiceRequestController from "../controllers/service-request.controller";

const router = Router();
const serviceRequestRepository = new ServiceRequestRepository();
const serviceRequestFacade = new ServiceRequestFacade(serviceRequestRepository);
const serviceRequestController = new ServiceRequestController(
  serviceRequestFacade
);

router.post("/newrequest", (req, res) =>
  serviceRequestController.saveServiceRequest(req, res)
);

export default router;
