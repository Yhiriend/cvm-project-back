import connection from "../db/connection";
import { DbServiceRequest } from "../models/service-request/db-service-request.type";
import { ServiceRequest } from "../models/service-request/service-request.type";
import { mapServiceRequestToDb } from "../utils/adapters/service-request.mappers";

export default class ServiceRequestRepository {
  constructor() {}

  async saveNewServiceRequest(serviceRequest: ServiceRequest) {
    try {
      const mappedServiceRequest: DbServiceRequest =
        await mapServiceRequestToDb(serviceRequest);

      const sql = "INSERT INTO service_requests SET ?";

      return new Promise((resolve, reject) => {
        connection.query(sql, mappedServiceRequest, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              data: true,
              referenceCode: mappedServiceRequest.reference_code,
            });
          }
        });
      });
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
}
