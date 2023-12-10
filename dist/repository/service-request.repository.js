"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const service_request_mappers_1 = require("../utils/adapters/service-request.mappers");
class ServiceRequestRepository {
    constructor() { }
    saveNewServiceRequest(serviceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mappedServiceRequest = yield (0, service_request_mappers_1.mapServiceRequestToDb)(serviceRequest);
                const sql = "INSERT INTO service_requests SET ?";
                return new Promise((resolve, reject) => {
                    connection_1.default.query(sql, mappedServiceRequest, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve({
                                data: true,
                                referenceCode: mappedServiceRequest.reference_code,
                            });
                        }
                    });
                });
            }
            catch (error) {
                console.error(error.message);
                throw error;
            }
        });
    }
}
exports.default = ServiceRequestRepository;
