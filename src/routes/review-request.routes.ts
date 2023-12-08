import { Router } from "express";
import validateToken from "./validate-token";
import { saveReviewRequest } from "../controllers/review-request.controller";

const router = Router();

router.post("/newrequest", saveReviewRequest);

export default router;
