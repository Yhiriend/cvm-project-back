import * as ReviewRequestRepository from '../repository/review-request.repository';
import { ReviewRequest } from '../models/review-request.type';

class ReviewRequestFacade {
  async saveNewReviewRequest(reviewRequest: ReviewRequest) {
    try {
      return await ReviewRequestRepository.saveNewReviewRequest(reviewRequest);
    } catch (error) {
      console.error(error);
      throw new Error('Error during saveNewReviewRequest process');
    }
  }
}

export default new ReviewRequestFacade();
