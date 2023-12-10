import { Request, Response } from "express";
import { ReviewRequest } from "../models/review-request.type";
import ReviewRequestFacade from "../facades/review-request.facade";

export default class ReviewRequestController {
  constructor(private reviewRequestFacade: ReviewRequestFacade) {}

  saveReviewRequest = async (req: Request, res: Response) => {
    const reviewRequest: ReviewRequest = req.body;
    try {
      const result = await this.reviewRequestFacade.saveNewReviewRequest(
        reviewRequest
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  };
}
