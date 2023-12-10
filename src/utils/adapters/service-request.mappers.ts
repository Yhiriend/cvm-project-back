import { DbServiceRequest } from "../../models/service-request/db-service-request.type";
import { ServiceRequest } from "../../models/service-request/service-request.type";
import { generateRefCode } from "../reference-coder";
import { getCurrentDate } from "../time-helper";

export const mapServiceRequestToDb = async (
  reviewRequest: ServiceRequest
): Promise<DbServiceRequest> => {
  return {
    reference_code: generateRefCode('0', '0'),
    service_type: reviewRequest.serviceType.toUpperCase(),
    product_brand: reviewRequest.productBrand.toUpperCase(),
    product_type: reviewRequest.productType.toUpperCase() ?? null,
    product_tech: reviewRequest.productTech.toUpperCase() ?? null,
    product_voltage: reviewRequest.productVoltage,
    product_aditional_info: reviewRequest.productAditionalInfo ?? null,
    customer_name: reviewRequest.customerName.toUpperCase(),
    customer_surname: reviewRequest.customerSurname.toUpperCase(),
    customer_address: reviewRequest.customerAddress.toUpperCase(),
    customer_phone: reviewRequest.customerPhone,
    request_date: getCurrentDate(),
  };
};

export const mapDbToServiceRequest = async (
  dbReviewRequest: DbServiceRequest
): Promise<ServiceRequest> => {
  return {
    id: dbReviewRequest.id,
    referenceCode: dbReviewRequest.reference_code,
    serviceType: dbReviewRequest.service_type,
    productBrand: dbReviewRequest.product_brand,
    productType: dbReviewRequest.product_type ?? null,
    productTech: dbReviewRequest.product_tech ?? null,
    productVoltage: dbReviewRequest.product_voltage,
    productAditionalInfo: dbReviewRequest.product_aditional_info ?? null,
    customerName: dbReviewRequest.customer_name,
    customerSurname: dbReviewRequest.customer_surname,
    customerAddress: dbReviewRequest.customer_address,
    customerPhone: dbReviewRequest.customer_phone,
    requestDate: dbReviewRequest.request_date,
  };
};
