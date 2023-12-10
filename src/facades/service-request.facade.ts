import ServiceRequestRepository from "../repository/service-request.repository";
import { ServiceRequest } from "../models/service-request/service-request.type";

export default class ServiceRequestFacade {
  constructor(private serviceRequestRepository: ServiceRequestRepository) {}

  async saveNewServiceRequest(serviceRequest: ServiceRequest) {
    try {
      return await this.serviceRequestRepository.saveNewServiceRequest(
        serviceRequest
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error during saveNewServiceRequest process");
    }
  }
}
