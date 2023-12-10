import * as ServiceRequestRepository from "../repository/service-request.repository";
import { ServiceRequest } from "../models/service-request/service-request.type";

class ServiceRequestFacade {
  async saveNewServiceRequest(serviceRequest: ServiceRequest) {
    try {
      return await ServiceRequestRepository.saveNewServiceRequest(
        serviceRequest
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error during saveNewServiceRequest process");
    }
  }
}

export default new ServiceRequestFacade();
