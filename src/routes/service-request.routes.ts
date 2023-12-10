import { Router } from "express";
import validateToken from "./validate-token";
import { saveServiceRequest } from "../controllers/service-request.controller";

const router = Router();

router.post("/newrequest", saveServiceRequest);

export default router;
