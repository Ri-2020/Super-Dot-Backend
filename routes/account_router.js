import { Router } from "express";
const accountRouter = Router();
import AccountController from "../controllers/account_controller.js";

accountRouter.get("/:userId" , AccountController.getUser )


export default accountRouter
