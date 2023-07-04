class SendSuccess{
    static createdSuccessfully = (res, obj, data) => res.status(201).json({
        status: "success",
        message: `${obj} created successfully`,
        data: data,
    });
    static LoginSuccessfully = (res, obj, data) => res.status(200).json({
        status: "success",
        message: `${obj} logged in successfully`,
        data: data,
    });
}


export default SendSuccess;