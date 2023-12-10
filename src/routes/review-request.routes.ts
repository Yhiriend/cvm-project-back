import { Router } from "express";
import validateToken from "./validate-token";
import ReviewRequestController from "../controllers/review-request.controller";
import ReviewRequestRepository from "../repository/review-request.repository";
import ReviewRequestFacade from "../facades/review-request.facade";

const router = Router();
const reviewRequestRepository = new ReviewRequestRepository();
const reviewRequestFacade = new ReviewRequestFacade(reviewRequestRepository);
const reviewRequestController = new ReviewRequestController(
  reviewRequestFacade
);

router.post("/newrequest", (req, res) =>
  reviewRequestController.saveReviewRequest(req, res)
);

export default router;
