import { Request, Response } from "express";
import UserFacade from "../facades/user.facade";
import { User } from "../models/user.type";

export const signInUser = async (req: Request, res: Response) => {
  const user: User = req.body;
  try {
    const result = await UserFacade.signIn(user);
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

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await UserFacade.loginUser(email, password);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    //connection.end();
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { user, newPassword } = req.body;
  try {
    const result = await UserFacade.updateUser(user, newPassword);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    //connection.end();
  }
};

export const getUserFromToken = (req: Request, res: Response) => {
  const headerToken = req.headers["authorization"];
  if (headerToken) {
    const bearerToken = headerToken.split(" ");
    const result = UserFacade.getUserFromToken(bearerToken[1]);
    res.json(result);
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
