import { Router } from "express";
import AccountController from "../controllers/account_controller.js";
import AuthMiddleware from "../middlewares/auth_middleware.js";


const accountRouter = Router();

accountRouter.post("/register" , AccountController.registerUser )
accountRouter.post("/login" , AccountController.loginUser)
accountRouter.post("/updateEmail" , AuthMiddleware.checkUserAuth , AccountController.updateEmail)
accountRouter.post("/updateScore" , AuthMiddleware.checkUserAuth, AccountController.updateScore)

export default accountRouter
