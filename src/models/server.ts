import express from "express";
import connection from "../db/connection";
import routesProduct from "../routes/product.routes";
import routesCart from "../routes/cart.routes";
import routesReviewRequest from "../routes/review-request.routes";
import routesDefault from "../routes/default.routes";
import routesUser from "../routes/user.routes";
import cors from "cors";

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
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
    connection.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully connected to the database");
      }
    });
  }

  routes() {
    this.app.use("/", routesDefault);
    this.app.use("/api/cart", routesCart);
    this.app.use("/api/reviewrequest", routesReviewRequest);
    this.app.use("/api/products", routesProduct);
    this.app.use("/auth/users", routesUser);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }
}

export default Server;
