class SendSuccess{
    static createdSuccessfully = (res, obj, data) => res.status(201).json({
        status: "success",
        message: `${obj} created successfully`,
        data: data,
    });
    static userCreatedSuccessfully = (res, obj, data) => res.status(201).json({
        status: "success",
        message: `${obj} created successfully`,
        data: data.data,
        token: data.token,
    });
    static LoginSuccessfully = (res, obj, data) => res.status(200).json({
        status: "success",
        token: query.token,
        message: `${obj} logged in successfully`,
        data: data.data,
    });
}


export default SendSuccess;