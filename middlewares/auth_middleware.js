import jwt from "jsonwebtoken";

import SendError from "../utils/errors_response.js";
import UserModel from "../models/user_schema.js";

class AuthMiddleware{
    static checkUserAuth = async(req, res, next) => {
        const Log = (message) => console.log("Auth Middleware: "+message);
        Log("Checking user auth...");
        let token;
        const { authorization } = req.headers;
        // Log(authorization);
        if (authorization && authorization.startsWith("Bearer")) {
            try {
              token = authorization.split(" ")[1];
              // console.log("|"+token); 
              const userId = jwt.verify(token, process.env.JWT_SECRET_KEY);
              // Log(userId._id) // this is printing
              req.user = await UserModel.findById(userId).select("-password");
              // console.log(req.user)
              if(req.user){
                Log("Authorized User found.")
                next();
              }else throw new Error("Unauthorized user!");
            }catch (error) {
              Log("Unauthorized user!")
              return SendError.unauthorizedUser(res);
            }
        }
    }
}


export default AuthMiddleware;