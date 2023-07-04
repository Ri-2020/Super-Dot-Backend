import { Router } from "express";
const accountRouter = Router();
import AccountController from "../controllers/account_controller.js";

accountRouter.get("/:userId" , AccountController.getUser )
accountRouter.post("/register" , AccountController.registerUser )

export default accountRouter
