import { Request, Response } from "express";
import { ReviewRequest } from "../models/review-request.type";
import * as ReviewRequestRepository from "../repository/review-request.repository";

export const saveReviewRequest = async (req: Request, res: Response) => {
  const reviewRequest: ReviewRequest = req.body;
  try {
    const result = await ReviewRequestRepository.saveNewReviewRequest(
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
