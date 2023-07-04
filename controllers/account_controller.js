import bcrypt from "bcrypt";
import UserModel from "../models/user_model";
import SendError from "../utils/errors";
import SendSuccess from "../utils/success";

class AccountController{

    static loginUser = async (req, res) =>{
        const { username, email, password } = req.body;
        if((username || email) && password){
            try{
                const user = await UserModel.findOne({ $or: [{ username: username }, { email: email }] });
                if(!user){
                    return SendError.notFoundError(res, "User");
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if(isMatch){
                    return SendSuccess.LoginSuccessfully(res, "User", 
                        {
                            username: user.username,
                            email: user.email,
                            profileimage: user.profileimage,
                            highScore: user.highScore,
                        }
                    );
                }
                return SendError.invalidCredentials(res);
                
            }catch(e){
                return SendError.internalServerError(res);
            }
        }else{
            return SendError.missingCredentials(res);
        }
    }

    static registerUser = async (req, res) =>{
        const { username, password} = req.body;
        if(username && password){
            try{
                userExists = await UserModel.findOne({ username: username }); 
                if(userExists){
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
                        return SendError.internalServerError(res);
                    }
                    return SendSuccess.createdSuccessfully(res, "User", user);
                })
            }catch(e){
                return SendError.internalServerError(res);
            }
        }else{
            return SendError.missingCredentials(res);
        }
    }

    
}


export default AccountController