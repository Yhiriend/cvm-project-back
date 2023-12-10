import { Router } from "express";
import UserController from "../controllers/user.controller";
import validateToken from "./validate-token";
import UserFacade from "../facades/user.facade";
import UserRepository from "../repository/user.repository";

const router = Router();
const userRepository = new UserRepository();
const userFacade = new UserFacade(userRepository);
const userController = new UserController(userFacade);

router.post("/signin", (req, res) => userController.signInUser(req, res));
router.post("/login", (req, res) => userController.loginUser(req, res));
router.post("/update", validateToken, (req, res) =>
  userController.updateUser(req, res)
);
router.get("/getuser", validateToken, (req, res) =>
  userController.getUserFromToken(req, res)
);

export default router;
