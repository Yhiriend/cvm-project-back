import { Request, Response } from "express";
import UserFacade from "../facades/user.facade";
import { User } from "../models/user.type";

export default class UserController {
  constructor(private userFacade: UserFacade) {}

  async signInUser(req: Request, res: Response) {
    const user: User = req.body;
    try {
      const result = await this.userFacade.signIn(user);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    } finally {
      //connection.end();
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await this.userFacade.loginUser(email, password);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      //connection.end();
    }
  }

  async updateUser(req: Request, res: Response) {
    const { user, newPassword } = req.body;
    try {
      const result = await this.userFacade.updateUser(user, newPassword);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      //connection.end();
    }
  }

  async getUserFromToken(req: Request, res: Response) {
    const headerToken = req.headers["authorization"];
    if (headerToken) {
      const bearerToken = headerToken.split(" ");
      const result = await this.userFacade.getUserFromToken(bearerToken[1]);
      res.json(result);
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
