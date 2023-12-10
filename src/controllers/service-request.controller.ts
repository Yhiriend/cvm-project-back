import { Request, Response } from "express";
import ServiceRequestFacade from "../facades/service-request.facade";
import { ServiceRequest } from "../models/service-request/service-request.type";

export const saveServiceRequest = async (req: Request, res: Response) => {
  const reviewRequest: ServiceRequest = req.body;
  try {
    const result = await ServiceRequestFacade.saveNewServiceRequest(
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
