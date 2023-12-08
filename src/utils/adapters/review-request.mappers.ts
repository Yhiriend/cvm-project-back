import { ReviewRequest } from "../../models/review-request.type";

export interface DbReviewRequest {
  id?: number;
  product_brand: string;
  product_cooling_capacity: string | null;
  product_type: string | null;
  product_tech: string | null;
  product_voltage: number;
  product_purchase_date: string;
  product_desired_price: number;
  product_aditional_info: string;
  customer_name: string;
  customer_surname: string;
  customer_address: string;
  customer_phone: string;
  request_date: string;
}

export const getCurrentDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const mapReviewRequestToDb = async (
  reviewRequest: ReviewRequest
): Promise<DbReviewRequest> => {
  return {
    product_brand: reviewRequest.productBrand,
    product_cooling_capacity: reviewRequest.productCoolingCapacity ?? null,
    product_type: reviewRequest.productType ?? null,
    product_tech: reviewRequest.productTech ?? null,
    product_voltage: reviewRequest.productVoltage,
    product_purchase_date: reviewRequest.productPurchaseDate,
    product_desired_price: reviewRequest.productDesiredPrice,
    product_aditional_info: reviewRequest.productAditionalInfo ?? null,
    customer_name: reviewRequest.customerName,
    customer_surname: reviewRequest.customerSurname,
    customer_address: reviewRequest.customerAddress,
    customer_phone: reviewRequest.customerPhone,
    request_date: getCurrentDate(),
  };
};

export const mapDbToReviewRequest = async (
  dbReviewRequest: DbReviewRequest
): Promise<ReviewRequest> => {
  return {
    productBrand: dbReviewRequest.product_brand,
    productCoolingCapacity: dbReviewRequest.product_cooling_capacity ?? null,
    productType: dbReviewRequest.product_type ?? null,
    productTech: dbReviewRequest.product_tech ?? null,
    productVoltage: dbReviewRequest.product_voltage,
    productPurchaseDate: dbReviewRequest.product_purchase_date,
    productDesiredPrice: dbReviewRequest.product_desired_price,
    productAditionalInfo: dbReviewRequest.product_aditional_info ?? null,
    customerName: dbReviewRequest.customer_name,
    customerSurname: dbReviewRequest.customer_surname,
    customerAddress: dbReviewRequest.customer_address,
    customerPhone: dbReviewRequest.customer_phone,
    requestDate: dbReviewRequest.request_date,
  };
};
