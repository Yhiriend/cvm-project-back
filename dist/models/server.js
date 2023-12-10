"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../db/connection"));
const product_routes_1 = __importDefault(require("../routes/product.routes"));
const cart_routes_1 = __importDefault(require("../routes/cart.routes"));
const review_request_routes_1 = __importDefault(require("../routes/review-request.routes"));
const service_request_routes_1 = __importDefault(require("../routes/service-request.routes"));
const default_routes_1 = __importDefault(require("../routes/default.routes"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        this.listen();
        this.connectDB();
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port: ", this.port);
        });
    }
    connectDB() {
        connection_1.default.connect((err) => {
            console.log("DATA ENV: ", process.env.HOST_BD);
            if (err) {
                console.log(err);
            }
            else {
                console.log("Successfully connected to the database");
            }
        });
    }
    routes() {
        this.app.use("/", default_routes_1.default);
        this.app.use("/api/cart", cart_routes_1.default);
        this.app.use("/api/reviewrequest", review_request_routes_1.default);
        this.app.use("/api/servicerequest", service_request_routes_1.default);
        this.app.use("/api/products", product_routes_1.default);
        this.app.use("/auth/users", user_routes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
}
exports.default = Server;
