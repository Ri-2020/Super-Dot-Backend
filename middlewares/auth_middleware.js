import SendError from "../utils/errors_response.js";

class AuthMiddleware{
    static checkUserAuth = async(req, res, next) => {
        const Log = (message) => console.log("Auth Middleware: "+message);
        Log("Checking user auth...");
        let token;
        const { authorization } = req.headers;
        Log(authorization);
        if (authorization && authorization.startsWith("Bearer")) {
            try {
              token = authorization.split(" ")[1];
              console.log(token); 
              // TODO: create a secret key 
              const userId = jwt.verify(token, process.env.JWT_SECRET_KEY);
              req.user = await UserModel.findById(userId).select("-password");
              Log("Authorized User found.")
              next();
            } catch (error) {
                Log("Unauthorized user!")
              return SendError.unauthorizedUser(res);
            }
        }
    }
}


export default AuthMiddleware;