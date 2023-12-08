import connection from "../db/connection";
import { ReviewRequest } from "../models/review-request.type";
import {
  DbReviewRequest,
  mapReviewRequestToDb,
} from "../utils/adapters/review-request.mappers";

export const saveNewReviewRequest = async (reviewRequest: ReviewRequest) => {
  try {
    const mappedReviewRequest: DbReviewRequest = await mapReviewRequestToDb(
      reviewRequest
    );

    const sql = "INSERT INTO review_requests SET ?";

    return new Promise((resolve, reject) => {
      connection.query(sql, mappedReviewRequest, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ data: true });
        }
      });
    });
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};
