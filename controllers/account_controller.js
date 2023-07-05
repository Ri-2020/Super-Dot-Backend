import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/user_schema.js";
import SendError from "../utils/errors_response.js";
import SendSuccess from "../utils/success_response.js";

class AccountController{

    static loginUser = async (req, res) =>{
        const Log = (message) => console.log("AccountController: "+message);
        Log("Loggin user in process...");
        const { username, email, password } = req.body;
        if((username || email) && password){
            try{
                const user = await UserModel.findOne({ $or: [{ username: username }, { email: email }] });
                if(!user){
                    Log("User not found, could not login!")
                    return SendError.notFoundError(res, "User");
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if(isMatch){
                    const id = user._id;
                    console.log("id", id);
                    const token = jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY, {
                      expiresIn: 604800,
                    });
                    Log("Logged in successfully.")
                    return SendSuccess.LoginSuccessfully(res, "User", 
                        {
                            data: {
                                username: user.username,
                                email: user.email,
                                profileimage: user.profileimage,
                                highScore: user.highScore,
                            },
                            token: token,
                        }
                    );
                }
                Log("Invalid Crediential, could not login!")
                return SendError.invalidCredentials(res);
                
            }catch(e){
                console.log("AccountController: Internal Server Error!");
                return SendError.internalServerError(res);
            }
        }else{
            console.log("AccountController: Missing credentials!");
            return SendError.missingCredentials(res);
        }
    }

    static registerUser = async (req, res) =>{
        const Log = (message) => console.log("AccountController: "+message);
        Log("Register user in progress...")
        const { username, password} = req.body;
        if(username && password){
            try{
                userExists = await UserModel.findOne({ username: username }); 
                if(userExists){
                    Log("User already exists, connnot register user!")
                    return SendError.alreadyExistsError(res, "User");
                }
                const salt= await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const user = new UserModel({
                    username: username,
                    password: hashedPassword,
                });

                user.save((err, user)=>{
                    if(err){
                        Log("Internal Server error, Connot regester user!")
                        return SendError.internalServerError(res);
                    }
                    Log("User Created Successfully.")
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
                    return SendSuccess.userCreatedSuccessfully(res, "User", {
                       data: {
                        username: username,
                        highScore: user.highScore,
                        profileimage: user.profileimage,
                       },
                       token:token,
                    });
                })
            }catch(e){
                Log("Internal Server error, Connot regester user!")
                return SendError.internalServerError(res);
            }
        }else{
            Log("Missing Credientials, Connot regiester user!")
            return SendError.missingCredentials(res);
        }
    }
    
    static updateEmail = async (req, res) =>{ 
        // update Email here

        // also check if email is valid or not
    }

}


export default AccountController