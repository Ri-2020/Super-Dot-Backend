import bcrypt from "bcrypt";
import UserModel from "../models/user_schema.js";
import SendError from "../utils/errors.js";
import SendSuccess from "../utils/success.js";

class AccountController{


    static loginUser = async (req, res) =>{
        console.log("AccountController: Loggin user in");
        const { username, email, password } = req.body;
        if((username || email) && password){
            try{
                const user = await UserModel.findOne({ $or: [{ username: username }, { email: email }] });
                if(!user){
                    console.log("AccountController: User not found");
                    return SendError.notFoundError(res, "User");
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if(isMatch){
                    console.log("AccountController: User logged in successfully");
                    return SendSuccess.LoginSuccessfully(res, "User", 
                        {
                            username: user.username,
                            email: user.email,
                            profileimage: user.profileimage,
                            highScore: user.highScore,
                        }
                    );
                }
                console.log("AccountController: Invalid credentials");
                return SendError.invalidCredentials(res);
                
            }catch(e){
                console.log("AccountController: Internal Server Error");
                return SendError.internalServerError(res);
            }
        }else{
            console.log("AccountController: Missing credentials");
            return SendError.missingCredentials(res);
        }
    }

    static registerUser = async (req, res) =>{
        console.log("AccountController: Registering user");
        const { username, password} = req.body;
        if(username && password){
            try{
                userExists = await UserModel.findOne({ username: username }); 
                if(userExists){
                    console.log("AccountController: User already exists");
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
                        console.log("AccountController: Internal Server Error");
                        return SendError.internalServerError(res);
                    }
                    console.log("AccountController: User created successfully");
                    return SendSuccess.createdSuccessfully(res, "User", user);
                })
            }catch(e){
                console.log("AccountController: Internal Server Error");
                return SendError.internalServerError(res);
            }
        }else{
            console.log("AccountController: Missing credentials");
            return SendError.missingCredentials(res);
        }
    }
    
    static updateEmail = async (req, res) =>{ 
        // update Email here
    }

}


export default AccountController