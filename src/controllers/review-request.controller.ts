import { Request, Response } from "express";
import { ReviewRequest } from "../models/review-request.type";
import ReviewRequestFacade from "../facades/review-request.facade";

export const saveReviewRequest = async (req: Request, res: Response) => {
  const reviewRequest: ReviewRequest = req.body;
  try {
    const result = await ReviewRequestFacade.saveNewReviewRequest(
      reviewRequest
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  } finally {
    //connection.end();
  }
};
