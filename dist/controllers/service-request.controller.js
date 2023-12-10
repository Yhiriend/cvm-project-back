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
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceRequestController {
    constructor(serviceRequestFacade) {
        this.serviceRequestFacade = serviceRequestFacade;
    }
    saveServiceRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewRequest = req.body;
            try {
                const result = yield this.serviceRequestFacade.saveNewServiceRequest(reviewRequest);
                res.json(result);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    error: "Internal Server Error",
                });
            }
            finally {
                //connection.end();
            }
        });
    }
}
exports.default = ServiceRequestController;
