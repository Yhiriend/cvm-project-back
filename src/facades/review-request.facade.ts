import ReviewRequestRepository from "../repository/review-request.repository";
import { ReviewRequest } from "../models/review-request.type";

export default class ReviewRequestFacade {
  constructor(private reviewRequestRepository: ReviewRequestRepository) {}

  async saveNewReviewRequest(reviewRequest: ReviewRequest) {
    try {
      return await this.reviewRequestRepository.saveNewReviewRequest(
        reviewRequest
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error during saveNewReviewRequest process");
    }
  }
}
