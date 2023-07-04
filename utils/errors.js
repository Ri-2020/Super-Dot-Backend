class SendError{
    static missingCredentials =(res) => res.status(401).json({
        status: "failed",
        message: "Some Required credentials are missing",
    });
    static invalidCredentials =(res) => res.status(401).json({
        status: "failed",
        message: "Invalid Credentials Provided",
    });
    static notFoundError = (res, obj) => res.status(404).json({
        status: "failed",
        message: `${obj} not found`,
    });
    static alreadyExistsError = (res, obj) => res.status(409).json({
        status: "failed",
        message: `${obj} already exists`,
    });
    static internalServerError = (res) => res.status(500).json({
        status: "failed",
        message:"Internal Server Error",
    })
}

export default SendError;