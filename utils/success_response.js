class SendSuccess{
    static createdSuccessfully = (res, obj, data) => res.status(201).json({
        status: "success",
        message: `${obj} created successfully`,
        data: data,
    });
    static userCreatedSuccessfully = (res, data) => res.status(201).json({
        status: "success",
        message: `User created successfully`,
        data: data.data,
        token: data.token,
    });
    static LoginSuccessfully = (res, obj, data) => res.status(200).json({
        status: "success",
        token: data.token,
        message: `${obj} logged in successfully`,
        data: data.data,
    });
    static objectUpdatedSuccessfully = (res, obj , data) => res.status(200).json({
        status: "success",
        message : `${obj} created successfully`,
        data: data,
    });
}


export default SendSuccess;