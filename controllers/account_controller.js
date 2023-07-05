import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/user_schema.js";
import SendError from "../utils/errors_response.js";
import SendSuccess from "../utils/success_response.js";
import Utility from "../utils/utility.js"

class AccountController{

    static loginUser = async (req, res) =>{
        const Log = (message) => console.log("AccountController: "+message);
        Log("Loggin user in process...");
        let { username , password } = req.body;
        let email;
        if(Utility.isValidEmail(username)){
            email = username;
            username = null
        }
        if((username || email) && password){
            try{
                let user;
                if(username){
                    user = await UserModel.findOne( {username: username }).select(
                        "+password"
                      );
                }else if(email){
                    user = await UserModel.findOne( {email: email }).select(
                        "+password"
                      );
                }else{
                    Log("Missing Credentials, could not signin!")
                    return SendError.missingCredentials(res);
                }
                // console.log(user);
                if(!user){
                    Log("User not found, could not login!")
                    return SendError.notFoundError(res, "User");
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if(isMatch){
                    const id = user._id
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
                Log("internalServerError! "+e.message)
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
            if(username.includes('@')  ){
                Log("Username contains restricted character, could not register user!");
                return SendError.invalidCredentials(res);
            }
            if(password.length <8){
                Log("Passwrd Length less than 8 characters, could not register user!")
                return SendError.invalidCredentials(res);
            }
            try{
                const userExists = await UserModel.findOne({ username: username }); 
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

                const result = await user.save();
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
                    expiresIn: 604800,
                });
                Log("User Created Successfully.")
                return SendSuccess.userCreatedSuccessfully(res, {
                    data: {
                        username: user.username,
                        highScore: user.highScore,
                        profileimage: user.profileimage,
                    },
                    token:token,
                });
            }catch(e){
                Log("Internal Server error, Connot regester user! "+e.message)
                return SendError.internalServerError(res);
            }
        }else{
            Log("Missing Credientials, Connot regiester user!")
            return SendError.missingCredentials(res);
        }
    }
    
    static updateEmail = async (req, res) =>{ 
        const Log = (message) => console.log("AccountController: "+message);
        Log("Update email in progress...")
        const { email } = req.body;
        if(email){
            if(!Utility.isValidEmail(email)){
                Log("Invalid email, could not update email!")
                return SendError.invalidCredentials(res);
            }
            try{
                const user = await UserModel.findOne({ _id: req.user._id });
                if(!user){
                    Log("User not found, connnot update email!")
                    return SendError.notFoundError(res, "User");
                }
                user.email = email;
                const result = await user.save();
                Log("Email Updated Successfully.")
                return SendSuccess.objectUpdatedSuccessfully(res, "Email", 
                    {
                        username: user.username,
                        email: user.email,
                        highScore: user.highScore,
                    },
                );
            }catch(e){
                Log("Internal Server error, Connot update email! "+e.message)
                return SendError.internalServerError(res);
            }
        }else{
            Log("Missing Credientials, Connot update email!")
            return SendError.missingCredentials(res);
        }
    }

    static updateScore = async (req, res) =>{ 
        const Log = (message) => console.log("AccountController: "+message);
        Log("Update scores in progress...")
        const { highScore, gamesPlayed,averageScore,totalScore,lastGameTimestamp,totalTimePlayed, dotsKilled } = req.body;
        if(highScore && gamesPlayed && averageScore && totalScore && lastGameTimestamp && totalTimePlayed && dotsKilled ){
            try{
                const user = await UserModel.findOne({ _id: req.user._id });
                if(!user){
                    Log("User not found, connnot update score!")
                    return SendError.notFoundError(res, "User");
                }

                user.highScore = highScore;
                user.gamesPlayed = gamesPlayed;
                user.averageScore = averageScore;
                user.totalScore = totalScore;
                user.lastGameTimestamp = lastGameTimestamp;
                user.totalTimePlayed = totalTimePlayed;
                user.dotsKilled = dotsKilled;

                const result = await user.save();
                Log("Score Updated Successfully.")
                return SendSuccess.objectUpdatedSuccessfully(res, "Score", 
                    {
                        username: user.username,
                        highScore: user.highScore,
                        gamesPlayed: user.gamesPlayed,
                        averageScore: user.averageScore,
                        totalScore: user.totalScore,
                        lastGameTimestamp: user.lastGameTimestamp,
                        totalTimePlayed: user.totalTimePlayed,
                        dotsKilled: user.dotsKilled, 
                    },
                );
            }catch(e){
                Log("Internal Server error, Connot update Score! "+e.message)
                return SendError.internalServerError(res);
            }
        }else{
            Log("Missing Credientials, Connot update Score!")
            return SendError.missingCredentials(res);
        }
    }
}


export default AccountController